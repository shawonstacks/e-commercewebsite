const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// ১. নতুন অর্ডার তৈরি করা
router.post('/', async (req, res) => {
  try {
    const { 
      customerName, name, 
      customerEmail, email, 
      shippingAddress, address, phone,
      items, 
      totalAmount, total, 
      totalCost 
    } = req.body;

    // items থেকে অটোমেটিক খরচ ও রেভিনিউ হিসাব (যদি ফ্রন্টএন্ড না পাঠায়)
    let calculatedCost = totalCost || 0;
    if (!calculatedCost && Array.isArray(items)) {
      calculatedCost = items.reduce((acc, item) => acc + ((item.costPrice || 0) * (item.quantity || 1)), 0);
    }

    const newOrder = new Order({
      customerName: customerName || name || 'Guest Customer',
      customerEmail: customerEmail || email || 'no-email@provided.com',
      shippingAddress: shippingAddress || address || phone || 'Address Not Provided',
      phone: phone || '',
      items: items || [],
      totalAmount: Number(totalAmount || total || 0),
      totalCost: Number(calculatedCost),
      status: 'pending' // ডিফল্ট স্ট্যাটাস ছোট হাতের অক্ষরে রাখা ভালো
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Order Creation Failed:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// ২. অ্যানালিটিক্স (Dynamic/Parametric Route এর আগে রাখা নিরাপদ)
router.get('/analytics/stats', async (req, res) => {
  try {
    // Case Insensitive সার্চের জন্য RegExp অথবা Lowercase ফিল্টারিং
    const orders = await Order.find();
    
    let totalRevenue = 0;
    let totalCost = 0;
    let pendingOrders = 0;
    let confirmedOrders = 0;
    let validSalesCount = 0;

    orders.forEach(order => {
      const currentStatus = (order.status || '').toLowerCase();

      if (currentStatus !== 'cancelled') {
        totalRevenue += Number(order.totalAmount || 0);
        totalCost += Number(order.totalCost || 0);
        validSalesCount++;
      }

      if (currentStatus === 'pending') pendingOrders++;
      if (currentStatus === 'confirmed' || currentStatus === 'completed') confirmedOrders++;
    });

    res.json({
      totalSalesCount: validSalesCount,
      totalRevenue,
      totalCost,
      netProfit: totalRevenue - totalCost,
      pendingOrders,
      confirmedOrders
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// ৩. সকল অর্ডার পাওয়া (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// ৪. অর্ডারের স্ট্যাটাস পরিবর্তন করা (একবারই রাখা হয়েছে)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
});

module.exports = router;