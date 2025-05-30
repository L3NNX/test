import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Get dashboard statistics
router.get('/', async (req, res) => {
  try {
    // Get total reviews
    const totalReviews = await Review.countDocuments();

    // Get average rating
    const ratingStats = await Review.aggregate([
      {
        $group: {
          _id: null,
          averageRating: { $avg: '$rating' }
        }
      }
    ]);
    const averageRating = ratingStats[0]?.averageRating || 0;

    // Get reviews by rating
    const reviewsByRating = await Review.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent reviews
    const recentReviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Get monthly reviews
    const monthlyReviews = await Review.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          averageRating: { $avg: '$rating' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      totalReviews,
      averageRating,
      reviewsByRating: Object.fromEntries(
        reviewsByRating.map(item => [item._id, item.count])
      ),
      recentReviews,
      monthlyReviews: monthlyReviews.map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
        count: item.count,
        averageRating: item.averageRating
      }))
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard statistics' });
  }
});

export default router;