import express from 'express';
import Inquiry from '../models/Inquiry.js';

const router = express.Router();

// Get all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get inquiries for a specific user
router.get('/user/:email', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific inquiry
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new inquiry
router.post('/', async (req, res) => {
  const inquiry = new Inquiry({
    ...req.body,
    createdAt: new Date()
  });
  try {
    const newInquiry = await inquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an inquiry
router.patch('/:id', async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;