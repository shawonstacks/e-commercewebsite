const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// সব অর্ডার পাওয়ার জন্য (Admin-এর জন্য)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// নতুন অর্ডার সেভ করা
router.post('/', async (req, res) => {
  const { customer, items, totalAmount } = req.body;
  try {
    const newOrder = new Order({ customer, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;