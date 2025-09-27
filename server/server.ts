// server/server.ts

import express from 'express';
import path from 'path';
// REMOVE: import { fileURLToPath } from 'url'; // No longer needed
import type { Request, Response } from 'express'; 

const app = express();
const port = process.env.PORT || 3001;

// --- CRITICAL FIX: REMOVE THE CONFLICTING CODE ---
// REMOVE THESE LINES:
// const __filename = fileURLToPath(import.meta.url); 
// const __dirname = path.dirname(__filename); 
// -------------------------------------------------

app.use(express.json());

// API endpoint for processing payments (omitting payment logic for brevity)
app.post('/api/process-google-pay', async (req: Request, res: Response) => {
    // ... API logic ...
});

// Serve static files from the React app build directory
// NOTE: Use the global __dirname provided by the Vercel runtime
const buildPath = path.join(__dirname, '../dist'); // Adjusted path
app.use(express.static(buildPath));

// For any other request, serve the React app's index.html
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