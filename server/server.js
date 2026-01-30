import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import logRoutes from './routes/logRoutes.js';
import socialRoutes from './routes/socialRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import fitnessRoutes from './routes/fitnessRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';

// Load Config
dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/social', socialRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/nutrition', nutritionRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API is running...', status: 'OK' });
});

// 404 Handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
