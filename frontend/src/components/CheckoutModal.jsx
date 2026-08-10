import { useState } from 'react';
import axios from 'axios';
import { X, CheckCircle2 } from 'lucide-react';

function CheckoutModal({ isOpen, onClose, cart, setCart }) {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ব্যাকএন্ডে অর্ডার ডাটা পাঠানো
    axios.post('http://localhost:5000/api/orders', {
      customer: formData,
      items: cart,
      totalAmount: totalAmount
    })
    .then(() => {
      setIsSuccess(true);
      setCart([]); // কার্ট খালি করে দেওয়া
    })
    .catch((err) => console.error("Order submit error:", err));
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '', address: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#121d18] border border-emerald-900/60 w-full max-w-md rounded-2xl p-6 text-stone-200 relative shadow-2xl">
        
        {/* Close Button */}
        <button onClick={handleClose} className="absolute top-4 right-4 text-stone-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-emerald-100">Order Confirmed!</h3>
            <p className="text-stone-400 text-xs mt-2 leading-relaxed">
              Thank you for ordering from The Moss Wanderer. We will process your order shortly.
            </p>
            <button 
              onClick={handleClose} 
              className="mt-6 w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-2.5 rounded-xl text-xs transition"
            >
              Back to Shop
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-emerald-100 mb-1">Checkout Details</h3>
            <p className="text-stone-400 text-xs mb-4">Total Amount: <span className="text-emerald-400 font-bold">৳ {totalAmount}</span></p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs text-stone-300 mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rahul Hasan"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  placeholder="017XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-stone-300 mb-1">Delivery Address</label>
                <textarea 
                  required
                  rows="3"
                  placeholder="Full address with house/road number"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-[#182620] border border-emerald-900/50 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-3 rounded-xl transition text-xs mt-2 shadow-lg shadow-emerald-900/40"
              >
                Confirm Order (Cash on Delivery)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;