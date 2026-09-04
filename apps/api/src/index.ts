import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import { connectDB } from './config/db.js';
import apiRouter from './routes/apiRouter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.use(
  cors({
    origin: [config.frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date(), service: 'saree-catalog-api' });
});

app.get('/ready', (req, res) => {
  res.json({ ready: true });
});

// API Routes
app.use('/api/v1', apiRouter);

// Error Handler
app.use(errorHandler);

export { app };

export async function startServer() {
  await connectDB();
  return app.listen(config.port, () => {
    console.log(`🚀 Sree Ram Silks Catalog API running on port ${config.port}`);
    console.log(`📡 Environment: ${config.nodeEnv}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

