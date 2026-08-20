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

// নতুন অর্ডার সেভ করা (Updated Payload Matching)
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, items, totalAmount } = req.body;

    const newOrder = new Order({
      customerName,
      phone,
      address,
      items,
      totalAmount
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order Save Error:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;