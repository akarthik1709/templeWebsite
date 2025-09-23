import React, { useRef, useState, useEffect } from "react";
import './Payments.css';
import './App.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import process from "process";
let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || "pk_test_51SAFDDFzrLeB0W027F3CFuqGfq7ruk6tF6FBG2NlanR75ls0jNbXxE2k1txMB79uGu2BeTbvghowIjxwltFO9MYD00CSnYuwew");

const CheckoutForm = ({ amount, setPaymentSuccess, setPaymentFailure, setPaymentProcessing, setPaymentError }: { amount: number, setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>, setPaymentFailure: React.Dispatch<React.SetStateAction<boolean>>, setPaymentProcessing: React.Dispatch<React.SetStateAction<boolean>>, setPaymentError: React.Dispatch<React.SetStateAction<string>>, paymentProcessing: boolean }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setIsLoading(true);
        setPaymentSuccess(false);
        setPaymentFailure(false);
        setPaymentError("");
    
        if (!stripe || !elements) {
            setPaymentError("Stripe.js has not loaded yet.");
            setPaymentProcessing(false);
            setIsLoading(false);
            return;
        }
    
        // Define a type for the successful or failed response
type StripeConfirmResult = {
    paymentIntent?: {
        status: string;
    };
    error?: {
        message?: string; // Corrected type: message is optional
    };
};

const result: StripeConfirmResult = await stripe.confirmPayment({
    elements,
    confirmParams: {
        return_url: `${window.location.origin}/services/payments`,
    },
});

if (result.error) {
    console.error("Payment confirmation failed:", result.error.message);
    setPaymentError(result.error.message ?? "An unknown error occurred during payment confirmation.");
    setPaymentFailure(true);
} else if (result.paymentIntent) {
    if (result.paymentIntent.status === 'succeeded') {
        console.log('[PaymentIntent]', result.paymentIntent);
        setPaymentSuccess(true);
        setPaymentProcessing(false);
    } else {
        console.log(`Payment status: ${result.paymentIntent.status}`);
        setPaymentError(`Payment failed with status: ${result.paymentIntent.status}`);
        setPaymentFailure(true);
    }
}
    
        setIsLoading(false);
    };

    return (
        <form className="payment-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Phone Number" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip Code" />
            <div style={{ marginBottom: '20px' }}>
                <PaymentElement />
            </div>
            <button type="submit" disabled={!stripe || isLoading || amount <= 0}>
                {isLoading ? 'Processing...' : `Pay ${amount}`}
            </button>
        </form>
    );
};

export default function Payments() {
    const [, setAboutOpen] = useState(false);
    const [, setContactOpen] = useState(false);
    const [, setEventsOpen] = useState(false);
    const [, setServicesOpen] = useState(false);
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const eventsRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    const [amount, setAmount] = useState(0);
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentFailure, setPaymentFailure] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
                setAboutOpen(false);
            }
            if (contactRef.current && !contactRef.current.contains(event.target as Node)) {
                setContactOpen(false);
            }
            if (eventsRef.current && !eventsRef.current.contains(event.target as Node)) {
                setEventsOpen(false);
            }
            if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
                setServicesOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [aboutRef, contactRef, eventsRef, servicesRef]);

    useEffect(() => {
        if (amount > 0) {
            const createPaymentIntent = async () => {
                try {
                    const response = await fetch('/create-payment-intent', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ amount: amount * 100 }) // Amount in cents
                    });
                    const data = await response.json();
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    setClientSecret(data.clientSecret);
                } catch (error) {
                    setPaymentError(error instanceof Error ? error.message : "Failed to create payment intent.");
                    setPaymentFailure(true);
                }
            };
            createPaymentIntent();
        }
    }, [amount]); 

    return (
        <>
            <div style={{ display: 'block', flexDirection: 'column' }}>
                <div className="bg-image"></div>
                <header className="app-header">
                    {/* ... (Your header content) */}
                </header>
                <div className="payment-container">
                    <div className="paymment-section">
                        <h1>Payment Gateway</h1>
                        {paymentSuccess && <div className="payment-success">Payment Successful! Thank you for your donation.</div>}
                        {paymentFailure && <div className="payment-failure">Payment Failed: {paymentError}</div>}
                        <div className="amount-input">
                            <label htmlFor="amount">Donation Amount ($)</label>
                            <input
                                id="amount"
                                type="number"
                                value={amount || ''}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                placeholder="Enter amount"
                                min="1"
                                required
                            />
                        </div>
                        {clientSecret && (
                            <Elements options={{ clientSecret }} stripe={stripePromise}>
                                <CheckoutForm
                                    amount={amount}
                                    setPaymentSuccess={setPaymentSuccess}
                                    setPaymentFailure={setPaymentFailure}
                                    setPaymentProcessing={setPaymentProcessing}
                                    setPaymentError={setPaymentError}
                                    paymentProcessing={paymentProcessing}
                                />
                            </Elements>
                        )}
                        {!clientSecret && amount > 0 && <p>Loading payment form...</p>}
                    </div>
                </div>
            </div>
        </>
    );
}