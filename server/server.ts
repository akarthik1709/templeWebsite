import express from 'express';
import path from 'path';
import type { Request, Response } from 'express'; 
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/process-google-pay', async (req, res) => {
  const { paymentToken, amount } = req.body;

  console.log('Received payment token:', paymentToken);
  console.log('Amount:', amount);
  console.log('Response body', res); ;

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


const buildPath = path.join(__dirname, '../dist'); 
app.use(express.static(buildPath));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

export default app; 

if (process.env.NODE_ENV !== 'production' && process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
