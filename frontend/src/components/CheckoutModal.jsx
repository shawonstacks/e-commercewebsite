import React, { useState } from 'react';
import axios from 'axios';
import { X, CheckCircle } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, setCart }) {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: cart,
      totalAmount: totalAmount
    };

    try {
      await axios.post(`${API_BASE_URL}/api/orders`, orderData);
      setIsSuccess(true);
      setCart([]);
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '', address: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#141f1a] border border-emerald-900/60 rounded-2xl w-full max-w-md p-6 relative text-stone-200">
        <button onClick={handleClose} className="absolute top-4 right-4 text-stone-400 hover:text-stone-100">
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-100">Order Placed Successfully!</h3>
            <p className="text-stone-400 text-sm mt-2">
              Thank you for your order, {formData.name}. We will contact you shortly.
            </p>
            <button 
              onClick={handleClose}
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-3 rounded-xl transition"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-emerald-100 mb-1">Checkout Details</h3>
            <p className="text-xs text-stone-400 mb-4">Total Amount: <span className="text-emerald-400 font-bold">৳ {totalAmount}</span></p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-stone-400 block mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                  required 
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                  required 
                />
              </div>

              <div>
                <label className="text-xs text-stone-400 block mb-1">Delivery Address</label>
                <textarea 
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows="3"
                  className="w-full bg-[#0d1411] border border-emerald-900/60 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
                  required 
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold py-3 rounded-xl transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Placing Order...' : 'Confirm Order (Cash on Delivery)'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}