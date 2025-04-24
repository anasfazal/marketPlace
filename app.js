import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { globalRateLimiter  } from './middleware/rateLimiter.js';
import redisClient from './config/redis.js';

const app = express();


app.use(cors());
app.use(express.json());
app.use(globalRateLimiter );


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


app.get('/health', (req, res) => {
  const redisStatus = redisClient.status === 'ready' ? 'connected' : 'disconnected';
  res.json({
    status: 'OK',
    redis: redisStatus,
    time: new Date().toISOString()
  });
});

app.use(errorHandler);

export default app;