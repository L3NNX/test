import express from 'express';
import Review from '../models/Review.js';
import { rateLimit } from 'express-rate-limit';
import { authenticateUser } from '../middleware/authMiddleware.js';
import multer from 'multer';

const upload = multer();
const router = express.Router();

// Rate limiting middleware
const reviewLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 5, // 5 reviews per window
  message: 'Too many reviews created. Please try again later.'
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const { sort = 'createdAt', order = 'desc', rating, page = 1, limit = 10 } = req.query;
    
    const query = { status: 'approved' };
    if (rating) query.rating = rating;

    const reviews = await Review.find(query)
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('userId', 'name');

    const total = await Review.countDocuments(query);

    res.json({
      reviews,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a review
router.post('/', authenticateUser, reviewLimiter, upload.array('images', 5), async (req, res) => {
  try {
    const { consultationId, rating, content } = req.body;
    const images = req.files; // multer puts uploaded files here

    if (!consultationId || !rating || !content) {
      return res.status(400).json({ message: 'consultationId, rating, and content are required' });
    }

    const review = new Review({
      userId: req.user.id,
      consultationId,
      rating: Number(rating),
      content,
      images: images?.map(file => ({
        url: `/uploads/${file.originalname}`, // Adjust your file URL logic here
        caption: '', // Optional: if you handle captions
      })) || [],
    });

    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote on a review
router.post('/:id/vote', async (req, res) => {
  try {
    const { type } = req.body;
    const update = type === 'helpful' 
      ? { $inc: { helpfulVotes: 1 } }
      : { $inc: { notHelpfulVotes: 1 } };

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Report a review
router.post('/:id/report', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          reports: {
            userId: req.user.id,
            reason: req.body.reason,
            createdAt: new Date()
          }
        }
      },
      { new: true }
    );

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;