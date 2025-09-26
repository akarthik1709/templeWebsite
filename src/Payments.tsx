import { useRef, useState, useEffect } from "react";
import './Payments.css';
import './App.css';
import GooglePayButton from '@google-pay/button-react';

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

    const handlePaymentSuccess = (paymentData: google.payments.api.PaymentData) => {
        setPaymentProcessing(true);
        setPaymentFailure(false);
        setPaymentSuccess(false);
        setPaymentError("");
        fetch('/api/process-google-pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentToken: paymentData.paymentMethodData.tokenizationData.token,
                amount: amount,
            }),
        })
        .then(response => response.json())

        .then(data => {
            if (data.success) {
                console.log('Payment successful:', data);
                setPaymentSuccess(true);
            } else {
                throw new Error(data.error || 'Payment processing failed on the server.');
            }
        })
        .catch(err => {
            setPaymentError(err instanceof Error ? err.message : "Failed to process Google Pay payment.");
            setPaymentFailure(true);
        })
        .finally(() => {
            setPaymentProcessing(false);
        });
    };

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
                        {amount > 0 && (
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
                                        totalPriceLabel: 'Total',
                                        totalPrice: String(amount),
                                        currencyCode: 'USD',
                                        countryCode: 'US',
                                    },
                                }}
                                onLoadPaymentData={handlePaymentSuccess}
                                onReadyToPayChange={isReady => console.log('Ready to pay:', isReady)}
                                onError={error => {
                                    console.error('Google Pay Error:', error);
                                    setPaymentError(error.toString());
                                    setPaymentFailure(true);
                                }}
                                buttonType="donate"
                                buttonSizeMode="fill"
                            />
                        )}
                        {paymentProcessing && <p>Processing payment...</p>}
                    </div>
                </div>
            </div>
        </>
    );
}