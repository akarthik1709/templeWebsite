const process = require('process');
const express = require('express');
require('dotenv').config();
const secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secret_key); 
const port = process.env.PORT || 4242;

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/api/process-google-pay', async (req, res) => {
  const { amount, paymentToken } = req.body;
  console.log('Received payment request for amount:', amount);

  if (!paymentToken) {
    return res.status(400).send({ error: 'Payment token is required.' });
  }

  try {
    // 1. Create a PaymentMethod from the Google Pay token
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: paymentToken, // This is the token from Google Pay
      },
    });

    // 2. Create and confirm a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: 'usd',
      payment_method: paymentMethod.id,
      confirm: true, // Confirm the payment immediately
      return_url: 'http://localhost:3000', // A return URL is required for confirmation
    });

    // Check the status of the payment intent
    if (paymentIntent.status === 'succeeded') {
      res.send({ success: true });
    } else {
      // Handle other statuses like 'requires_action' if 3D Secure is needed
      res.status(400).send({ error: 'Payment failed or requires additional action.', clientSecret: paymentIntent.client_secret });
    }

  } catch (e) {
    console.error('Stripe error:', e.message);
    res.status(500).send({ error: e.message });
  }
});

// Export the app for vite-plugin-node
export const viteNodeApp = app;

// The app is started by Vite in dev, so we only listen if not in development
if (process.env.NODE_ENV !== 'development') {
  app.listen(port, () => console.log(`Node server listening on port ${port}!`));
}
