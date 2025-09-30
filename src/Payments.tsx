import { useState, useEffect, useRef } from "react";
import './Payments.css';
import './App.css';
import GooglePayButton from '@google-pay/button-react';

// Define the structure for the API response
interface PaymentResponse {
    success: boolean;
    error?: string;
    message?: string;
}

export default function Payments() {
    // 1. Cleaned up unused state variables for clarity
    // Removed setAboutOpen, setContactOpen, etc., as they were only used for hiding/showing elements,
    // which aren't in this component's render block.
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const eventsRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);

    const [amount, setAmount] = useState(0);
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentFailure, setPaymentFailure] = useState(false);

    // 2. Optimized useEffect: Only includes necessary cleanup logic
    // Removed the unused setters (setAboutOpen, etc.) from the dependency array.
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Note: Since the state setters are not included in this component's scope, 
            // the logic below (which checks refs and tries to set state) is kept for context,
            // but the setters have been removed from the component body for being unused.
            // If this logic is needed, the setters must be defined and used.
            // For now, the cleanup logic is kept simple.

            // Example: If you need to access a setter, you must declare it: 
            // const [isMenuOpen, setIsMenuOpen] = useState(false);
        };
        
        // This effect's primary purpose is handling outside clicks based on refs.
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Empty dependency array as the refs and handleClickOutside are stable

    const handlePaymentSuccess = (paymentData: google.payments.api.PaymentData) => {
        // Reset state and show processing indicator
        setPaymentProcessing(true);
        setPaymentFailure(false);
        setPaymentSuccess(false);
        setPaymentError("");
        
        // Ensure amount is valid before fetching
        if (amount <= 0) {
            setPaymentError("Amount must be greater than zero.");
            setPaymentFailure(true);
            setPaymentProcessing(false);
            return;
        }

        fetch('/api/process-google-pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentToken: paymentData.paymentMethodData.tokenizationData.token,
                amount: amount, // Send the state amount
            }),
        })
        .then(response => {
             // Check if the network request was successful (200-299 status code)
            if (!response.ok) {
                // If the server responded with an error (e.g., 500, 400), throw an error
                return response.json().then(errorData => {
                    throw new Error(errorData.error || `Server responded with status: ${response.status}`);
                });
            }
            return response.json() as Promise<PaymentResponse>; // Cast the response type
        })
        .then(data => {
            if (data.success) {
                console.log('Payment successful:', data);
                setPaymentSuccess(true);
            } else {
                // Handle success=false from server response
                throw new Error(data.error || 'Payment processing failed on the server.');
            }
        })
        .catch(err => {
            console.error('Fetch/Processing Error:', err);
            setPaymentError(err instanceof Error ? err.message : "Failed to connect to the server or process payment.");
            setPaymentFailure(true);
        })
        .finally(() => {
            setPaymentProcessing(false);
        });
    };

    
    // 3. Razorpay/UPI Logic (Placeholder)
    // The previous inline <script> and HTML were incorrect in JSX. 
    // Razorpay integration must be handled by loading the library and running initialization 
    // within a function that is triggered by a button click, typically using a state variable 
    // to pass the amount dynamically.
    const handleRazorpayClick = () => {
        const options = {
            key_id: 'YOUR_RAZORPAY_KEY_ID', // Replace with your actual Razorpay key ID
            amount: amount * 100, // Convert to cents
            currency: 'INR',
            name: 'Sringeri SharadhaPeetham',
            description: 'Temple Donation',
            image: 'https://sringeri.net/logo.png',
            order_id: 'YOUR_ORDER_ID', // Replace with your actual order ID
            handler: handlePaymentSuccess,
            prefill: {
                name: 'User Name',
                email: 'user@example.com',
                contact: '9999999999',
            },
            notes: {
                order_id: 'YOUR_ORDER_ID', // Replace with your actual order ID
            },
            theme: {
                color: '#333333',
            },
    
            
    };
}
// Add UPI payment QR Code. 

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="bg-image"></div>
                <header className="app-header">
                    {/* ... (Your header content) */}
                </header>
                <div className="payment-container">
                    <div className="paymment-section">
                        <h1>Donation Payment Gateway</h1>
                        {paymentSuccess && <div className="payment-success">Payment Successful! Thank you for your donation.</div>}
                        {paymentFailure && <div className="payment-failure">Payment Failed: {paymentError}</div>}
                        
                        <div className="amount-input">
                            <label htmlFor="amount">Donation Amount ($)</label>
                            <input
                                id="amount"
                                type="number"
                                value={amount || ''}
                                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))} // Ensure amount is non-negative
                                placeholder="Enter amount"
                                min="1"
                                required
                            />
                        </div>

                        {paymentProcessing && <p className="processing-message">Processing payment...</p>}
                        
                        {/* Google Pay Button */}
                        {amount > 0 && !paymentProcessing && (
                            <div style={{marginTop: '20px'}}>
                                <GooglePayButton
                                    environment="TEST" 
                                    paymentRequest={{
                                        apiVersion: 2,
                                        apiVersionMinor: 0,
                                        allowedPaymentMethods: [
                                            {
                                                type: 'CARD',
                                                parameters: {
                                                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                                    allowedCardNetworks: ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"],
                                                },
                                                tokenizationSpecification: {
                                                    type: 'PAYMENT_GATEWAY',
                                                    parameters: {
                                                      // NOTE: You must replace the Stripe key with your actual TEST publishable key
                                                      gateway: 'stripe',
                                                      'stripe:version': '2020-08-27',
                                                      'stripe:publishableKey': 'pk_test_51SAFDDFzrLeB0W02CY4j6maRxKxLpzE3rrvZav1QsufkVhvf9Pi0mwc74nYhy9QRcT3ZZv2ZtQYSprQFZNY3gxTn00DdDh4fJm'
                                                    }
                                                },
                                            },
                                        ],
                                        merchantInfo: {
                                            merchantId: '12345678901234567890',
                                            merchantName: 'Example Merchant',
                                        },
                                        transactionInfo: {
                                            totalPriceStatus: 'FINAL',
                                            totalPriceLabel: 'Total Donation',
                                            totalPrice: String(amount.toFixed(2)), // Format amount to 2 decimal places
                                            currencyCode: 'USD',
                                            countryCode: 'US',
                                        },
                                    }}
                                    onLoadPaymentData={handlePaymentSuccess}
                                    onReadyToPayChange={isReady => console.log('Ready to pay:', isReady)}
                                    onError={error => {
                                        console.error('Google Pay Error:', error);
                                        setPaymentError('Google Pay setup error or user cancellation.');
                                        setPaymentFailure(true);
                                    }}
                                    buttonType="donate"
                                    buttonSizeMode="fill"
                                />
                                {/* Add the image below*/}
                                <div className="qr-code-container">
                                    <div className="qr-code-image">
                                    <img src="/upi_pay_img.jpeg" alt="Razorpay logo" />
                                    </div>
                                </div>
                            </div>

                        )}
                        
                    </div>
                </div>
            </div>
        </>
    );
}