const process = require('process');
const express = require('express');
const app = express();
require('dotenv').config();
const secret_key = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(secret_key); 
const port = 4242;
app.use(express.static('public'));
app.use(express.json());


app.post('/api/process-google-pay', async (req, res) => {
  const { amount } = req.body;
  console.log('Received payment request:', JSON.stringify(req.body));
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
    console.log("Response"+res.body);

  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

app.listen(port, () => console.log('Node server listening on port 4242!'));
