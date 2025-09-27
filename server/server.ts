
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;

// The __dirname variable is not available in ES modules, so we need to create it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// API endpoint for processing payments
app.post('/api/process-google-pay', async (req, res) => {
  const { paymentToken, amount } = req.body;

  console.log('Received payment token:', paymentToken);
  console.log('Amount:', amount);

  // IMPORTANT: Add your actual payment processing logic with Stripe here.
  // This is a mock implementation.
  try {
    // Example: const charge = await stripe.charges.create({ ... });
    // For now, we'll just simulate a successful payment.
    if (paymentToken && amount > 0) {
      res.json({ success: true, message: 'Payment processed successfully' });
    } else {
      res.status(400).json({ success: false, error: 'Invalid payment data' });
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ success: false, error: 'Server error processing payment' });
  }
});

// Serve static files from the React app build directory
const buildPath = path.join(__dirname, 'templeWebsite/dist');
app.use(express.static(buildPath));

// For any other request, serve the React app's index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

export default app; // This is what Vercel needs to execute the function.

// This entire block is only for local execution (dev or npm start)
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
