const process = require('process');
const express = require('express');
const app = express();
require('dotenv').config();
const secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secret_key); 
const port = 4242;
app.use(express.static('public'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).send({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      // Stripe requires the amount to be in cents
      amount: amount * 100, 
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.listen(port, () => console.log('Node server listening on port 4242!'));