const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Custom Enquiry Schema
const customEnquirySchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  jarType: { type: String, default: 'Medium Jar' },
  theme: { type: String, default: 'Forest Waterfall' },
  budget: { type: Number, default: 0 },
  details: { type: String, default: '' },
  status: { type: String, default: 'New' }, // New, Contacted, Completed
  createdAt: { type: Date, default: Date.now }
});

const CustomEnquiry = mongoose.model('CustomEnquiry', customEnquirySchema);

// GET: All Custom Enquiries (For Admin Panel)
router.get('/', async (req, res) => {
  try {
    const enquiries = await CustomEnquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching custom enquiries', error: err.message });
  }
});

// POST: Submit New Custom Request (From Main Store)
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, jarType, theme, budget, details } = req.body;
    
    if (!customerName || !phone) {
      return res.status(400).json({ message: 'Name and Phone are required!' });
    }

    const newEnquiry = new CustomEnquiry({
      customerName,
      phone,
      jarType,
      theme,
      budget: Number(budget) || 0,
      details
    });

    await newEnquiry.save();
    res.status(201).json({ message: 'Custom request submitted successfully!', enquiry: newEnquiry });
  } catch (err) {
    res.status(500).json({ message: 'Error saving custom request', error: err.message });
  }
});

// PATCH: Update Status (For Admin Panel)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await CustomEnquiry.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
});

module.exports = router;