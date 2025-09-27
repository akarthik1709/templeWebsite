import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // This must be an 'import'
import type { Request, Response } from 'express'; // Use type imports for clearer types

const app = express();
const port = process.env.PORT || 3001;

// --- CRITICAL FIX: Use the correct import.meta.url syntax ---
// This is the standard, correct way to derive __filename and __dirname in ES Modules.
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
// -----------------------------------------------------------

app.use(express.json());

// API endpoint for processing payments
// Use the Request and Response types from 'express' instead of inline definitions
app.post('/api/process-google-pay', async (req: Request, res: Response) => {
  const { paymentToken, amount } = req.body;

  console.log('Received payment token:', paymentToken);
  console.log('Amount:', amount);

  try {
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
// NOTE: Make sure 'templeWebsite/dist' is the correct path *relative to the project root*
const buildPath = path.join(__dirname, 'templeWebsite/dist');
app.use(express.static(buildPath));

// For any other request, serve the React app's index.html
// Ensure this path is correct for your Vercel deployment structure
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Vercel Serverless Requirement
export default app; 

// Local execution block (keep this wrapped)
if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}