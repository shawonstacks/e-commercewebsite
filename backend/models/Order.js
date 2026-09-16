const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, default: '' },
  phone: { type: String, default: '' },
  shippingAddress: { type: String, required: true },
  items: [
    {
      productId: { type: String }, // Flexible to prevent CastError
      name: { type: String },
      price: { type: Number, default: 0 },
      costPrice: { type: Number, default: 0 },
      quantity: { type: Number, default: 1 }
    }
  ],
  totalAmount: { type: Number, required: true },  // মোট রেভিনিউ (Revenue)
  totalCost: { type: Number, default: 0 },        // মোট খরচ (Total Cost)
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);