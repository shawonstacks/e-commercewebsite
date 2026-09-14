const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ১. নতুন অর্ডার তৈরি করা
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, shippingAddress, items, totalAmount, totalCost } = req.body;
    const newOrder = new Order({
      customerName,
      customerEmail,
      shippingAddress,
      items,
      totalAmount,
      totalCost
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// ২. সকল অর্ডার পাওয়া (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

// ৩. অর্ডারের স্ট্যাটাস পরিবর্তন করা (Confirm / Cancel / Deliver)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error });
  }
});

// ৪. রেভিনিউ ও প্রফিট অ্যানালিটিক্স পাওয়া
router.get('/analytics/stats', async (req, res) => {
  try {
    const orders = await Order.find({ status: { $ne: 'cancelled' } });
    
    let totalRevenue = 0;
    let totalCost = 0;
    let pendingOrders = 0;
    let confirmedOrders = 0;

    orders.forEach(order => {
      totalRevenue += order.totalAmount || 0;
      totalCost += order.totalCost || 0;
      if (order.status === 'pending') pendingOrders++;
      if (order.status === 'confirmed') confirmedOrders++;
    });

    const netProfit = totalRevenue - totalCost;

    res.json({
      totalSalesCount: orders.length,
      totalRevenue,
      totalCost,
      netProfit,
      pendingOrders,
      confirmedOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
});

module.exports = router;