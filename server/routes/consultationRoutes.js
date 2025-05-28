import express from 'express';
import Consultation from '../models/Consultation.js';

const router = express.Router();

// Get all consultations
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ date: 1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific consultation
router.get('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new consultation
router.post('/', async (req, res) => {
  const consultation = new Consultation(req.body);
  try {
    const newConsultation = await consultation.save();
    res.status(201).json(newConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a consultation
router.patch('/:id', async (req, res) => {
  try {
    const updatedConsultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedConsultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(updatedConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a consultation
router.delete('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findByIdAndDelete(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json({ message: 'Consultation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;