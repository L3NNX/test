import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import inquiryRoutes from './routes/inquiryRoutes.js';
import consultationRoutes from './routes/consultationRoutes.js';
import universityRoutes from './routes/universityRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aussie-edu')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('AussieEdu API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});