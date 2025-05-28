import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ranking: {
    type: Number
  },
  website: {
    type: String
  },
  programs: [{
    type: String,
    trim: true
  }],
  fees: {
    undergraduate: {
      type: Number
    },
    postgraduate: {
      type: Number
    }
  },
  scholarships: [{
    name: {
      type: String,
      trim: true
    },
    amount: {
      type: String,
      trim: true
    },
    eligibility: {
      type: String,
      trim: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const University = mongoose.model('University', universitySchema);

export default University;