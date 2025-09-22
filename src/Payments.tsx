// online payment
import React, { useRef } from "react";
import {useState, useEffect } from "react";
import './Payments.css';
import './App.css';
import {Link} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import process  from "process";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY || "");

const CheckoutForm = ({ amount, setPaymentSuccess, setPaymentFailure, setPaymentProcessing, setPaymentError, paymentProcessing }: { amount: number, setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>, setPaymentFailure: React.Dispatch<React.SetStateAction<boolean>>, setPaymentProcessing: React.Dispatch<React.SetStateAction<boolean>>, setPaymentError: React.Dispatch<React.SetStateAction<string>>, paymentProcessing: boolean }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setPaymentProcessing(true);
        setPaymentSuccess(false);
        setPaymentFailure(false);
        setPaymentError("");

        if (!stripe || !elements) {
            setPaymentError("Stripe.js has not loaded yet.");
            setPaymentProcessing(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        console.log('Card Element:', cardElement);

        if (!cardElement) {
            setPaymentError("Card element not found.");
            setPaymentProcessing(false);
            return;
        }

        // Create a PaymentIntent on the server
        let clientSecret;
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
            clientSecret = data.clientSecret;
        } catch (error) {
            setPaymentError(error instanceof Error ? error.message : "Failed to create payment intent.");
            setPaymentFailure(true);
            setPaymentProcessing(false);
            return;
        }


        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setPaymentError(error.message ?? "An unknown error occurred during payment confirmation.");
            setPaymentFailure(true);
            setPaymentProcessing(false);
        } else if (paymentIntent?.status === 'succeeded') {
            console.log('[PaymentIntent]', paymentIntent);
            setPaymentSuccess(true);
            setPaymentProcessing(false);
        } else {
            setPaymentError(`Payment failed with status: ${paymentIntent?.status}`);
            setPaymentFailure(true);
            setPaymentProcessing(false);
        }
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
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}>
                <CardElement />
            </div>
            <div>
                <PaymentElement/>
            </div>
            <button type="submit" disabled={!stripe || paymentProcessing || amount <= 0}>
                {paymentProcessing ? 'Processing...' : `Pay ${amount}`}
            </button>
        </form>
    );
};


export default function Payments() {
    const [isAboutOpen, setAboutOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isEventsOpen, setEventsOpen] = useState(false);
  const [isServicesOpen, setServicesOpen] = useState(false);
  const [isResourcesOpen, setResourcesOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  //const resourcesRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState(0);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [ , setPaymentProcessing] = useState(false);
  const [paymentFailure, setPaymentFailure] = useState(false);
  


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

    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aboutRef, contactRef, eventsRef, servicesRef]);


  return (
    <>
    <div style={{ display: 'block', flexDirection: 'column' }}>
      <div className="bg-image"></div>
      <header className="app-header">
        <div className="logo-sharadha">
          <img src="/sharadha.webp" alt="SharadhaPeetham logo" />
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
              <button onClick={()=> setServicesOpen(!isServicesOpen)} className="tabs">
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
            <div className="dropdown">
              <button  onClick={()=> setResourcesOpen(!isResourcesOpen)} className="tabs">
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
        </div>
      </header><div className="payment-container">
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

                    <Elements stripe={stripePromise}>
                        <CheckoutForm 
                              amount={amount}
                              setPaymentSuccess={setPaymentSuccess}
                              setPaymentFailure={setPaymentFailure}
                              setPaymentProcessing={setPaymentProcessing}
                              setPaymentError={setPaymentError} paymentProcessing={false}                        />
                    </Elements>
                </div>
            </div>
            </div>
            </>
    );
}