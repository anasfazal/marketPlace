import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import { globalLimiter, authLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import { logActivity } from './utils/logger.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(globalLimiter);


app.use((req, res, next) => {
    logActivity(`Request: ${req.method} ${req.originalUrl} - IP: ${req.ip}`);
    next();
});

app.get('/', (req, res) => {
    res.send(`Welcome to the Marketplace API This processing is running with processId  ${process.pid}`);
});




app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
