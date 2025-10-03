import { useState, useEffect, useRef } from "react";
import './Payments.css';
import './App.css';
import GooglePayButton from '@google-pay/button-react';
import { Link } from "react-router-dom";

// Define the structure for the API response
interface PaymentResponse {
    success: boolean;
    error?: string;
    message?: string;
}

export default function Payments() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);
    const eventsRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const resourcesRef = useRef<HTMLDivElement>(null);
    const membershipRef = useRef<HTMLDivElement>(null);

    const [amount, setAmount] = useState(0);
    const [paymentError, setPaymentError] = useState("");
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [paymentFailure, setPaymentFailure] = useState(false);
    const [isAboutOpen, setAboutOpen] = useState(false);
    const [isContactOpen, setContactOpen] = useState(false);
    const [isEventsOpen, setEventsOpen] = useState(false);
    const [isServicesOpen, setServicesOpen] = useState(false);
    const [isResourcesOpen, setResourcesOpen] = useState(false);
    const [ismembershipOpen, setmembershipOpen] = useState(false);

    useEffect(() => {
    
        function handleClickOutside(event: MouseEvent) {
          if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
            setAboutOpen(false);
          }
          if (contactRef.current && !contactRef.current.contains(event.target as Node )) {
            setContactOpen(false);
          }
          if (eventsRef.current && !eventsRef.current.contains(event.target as Node )) {
            setEventsOpen(false);
          }
          if (servicesRef.current && !servicesRef.current.contains(event.target as Node )) {
            setServicesOpen(false);
          }
          if (resourcesRef.current &&!resourcesRef.current.contains(event.target as Node )) {
            setResourcesOpen(false);
          }
          if (membershipRef.current &&!membershipRef.current.contains(event.target as Node )) {
            setmembershipOpen(false);
          }
          
    
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [aboutRef, contactRef, eventsRef, servicesRef, resourcesRef, membershipRef]);

    const handlePaymentSuccess = (paymentData: google.payments.api.PaymentData) => {
        setPaymentProcessing(true);
        setPaymentFailure(false);
        setPaymentSuccess(false);
        setPaymentError("");
        
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


    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="bg-image"></div>
                <header className="app-header">
                    <div className="logo-sharadha">
                            <img src="/sharadha.webp" alt="SharadhaPeetham logo" onClick={()=> window.location.href="/"}/>
                          </div>
                          <div className='pagetitle'>
                            <h1>SharadhaPeetham</h1>
                          </div>
                          <div className='tabs-container'>
                            <div className="tab">
                              <div className="dropdown" ref={aboutRef}>
                                <button onClick={() => setAboutOpen(!isAboutOpen)} className="tabs">
                                  About
                                </button>
                                {isAboutOpen && (
                                  <div className="dropdown-menu">
                                    <a href="/about" className="dropdown-item">Mutt History</a>
                                    <a href="/about" className="dropdown-item">Details on Sri Dwithiya Chandrasekara Bharathi Adistana</a>
                                    <a href='/Tkudalu Stala Purana cum appeal- english version_021419.pdf' className="dropdown-item">Sthala Purana</a>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="tab">
                              <div className="dropdown" ref={contactRef}>
                                <button onClick={() => setContactOpen(!isContactOpen)} className="tabs">
                                  Contact
                                </button>
                                {isContactOpen && (
                                  <div className="dropdown-menu">
                                    <a href="https://sringeri.net/contact" className="dropdown-item">Phone</a>
                                    <a href="https://sringeri.net/contact" className="dropdown-item">Email</a>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="tab">
                              <div className="dropdown" ref={eventsRef}>
                                <button onClick={() => setEventsOpen(!isEventsOpen)} className="tabs">
                                  Events
                                </button>
                                {isEventsOpen && (
                                  <div className="dropdown-menu">
                                    <Link to="/events/calendar" className="dropdown-item">Calendar </Link>
                                    <a href="/events" className="dropdown-item">Past Events</a>
                                    <a href="/events" className="dropdown-item">Upcoming Events</a>
                                    <a href="/events" className="dropdown-item">Meetings</a>
                                    <a href="/events" className="dropdown-item">Aksharabhyasa</a>
                                    <a href="/events" className="dropdown-item">Poojas</a>
                                    <a href="/events" className="dropdown-item">Navarathri Pooja</a>
                                    <a href="/events" className="dropdown-item">Shankara Jayanti</a>
                                    <a href="/events" className="dropdown-item">Shankara Aradhane</a>
                                    <a href="/events" className="dropdown-item">Bhajans</a>
                                    <a href="/events" className="dropdown-item">Sri Sri Vidushekara Bharathi's visit to Mutt</a>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="tab">
                              <div className="dropdown" ref={servicesRef}>
                                <button onClick={() => setServicesOpen(!isServicesOpen)} className="tabs">
                                  Services
                                </button>
                                {isServicesOpen && (
                                  <div className="dropdown-menu">
                                    <Link to="/services/payments" className="dropdown-item">Online Payment</Link>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="tab">
                              <div className="dropdown" ref={resourcesRef}>
                                <button onClick={() => setResourcesOpen(!isResourcesOpen)} className="tabs">
                                  Resources
                                </button>
                                {isResourcesOpen && (
                                  <div className="dropdown-menu">
                                    <a href="https://sringeri.net/contact" className="dropdown-item">LN Sastry Book</a>
                                    <a href="https://sringeri.net/contact" className="dropdown-item">Sri Sringeri Vignetts</a>
                    
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="tab">
                              <div className="dropdown" ref={membershipRef}>
                                <button onClick={() => setmembershipOpen(!ismembershipOpen)} className="tabs">
                                  Membership Details
                                </button>
                                {ismembershipOpen && (
                                  <div className="dropdown-menu">
                                    <a href="https://forms.gle/JNHy2iGtwjozoPi3A" className="dropdown-item">Membership</a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
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