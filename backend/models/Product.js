const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },       // বিক্রয়মূল্য
  costPrice: { type: Number, default: 0 },        // ক্রয়মূল্য (লাভ হিসাব করার জন্য)
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);