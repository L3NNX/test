import express from 'express';
import University from '../models/University.js';

const router = express.Router();

// Get all universities
router.get('/', async (req, res) => {
  try {
    const universities = await University.find().sort({ ranking: 1 });
    res.json(universities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific university
router.get('/:id', async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(university);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new university
router.post('/', async (req, res) => {
  const university = new University(req.body);
  try {
    const newUniversity = await university.save();
    res.status(201).json(newUniversity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a university
router.patch('/:id', async (req, res) => {
  try {
    const updatedUniversity = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUniversity) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json(updatedUniversity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a university
router.delete('/:id', async (req, res) => {
  try {
    const university = await University.findByIdAndDelete(req.params.id);
    if (!university) {
      return res.status(404).json({ message: 'University not found' });
    }
    res.json({ message: 'University deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;