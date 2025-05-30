import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String, 
    ref: 'User',
    required: true,
  },
  consultationId: {
    type: String, 
    ref: 'Consultation',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 0.5,
    max: 5,
    validate: {
      validator: (v) => v % 0.5 === 0,
      message: 'Rating must be in increments of 0.5'
    }
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
    maxlength: 1000
  },
  images: [{
    url: String,
    caption: String
  }],
  verifiedPurchase: {
    type: Boolean,
    default: false
  },
  helpfulVotes: {
    type: Number,
    default: 0
  },
  notHelpfulVotes: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reports: [{
    userId: {
     type: String,
      ref: 'User'
    },
    reason: String,
    createdAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

reviewSchema.index({ userId: 1, consultationId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;