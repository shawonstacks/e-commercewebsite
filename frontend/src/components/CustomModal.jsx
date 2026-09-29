import React, { useState } from 'react';
import axios from 'axios';
import { X, Sparkles, Send, Phone, User, Tag, FileText, CheckCircle2 } from 'lucide-react';

const API_BASE_URL = `http://${window.location.hostname}:5000`;

export default function CustomModal({ isOpen, onClose }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [jarType, setJarType] = useState('Medium Jar');
  const [theme, setTheme] = useState('Forest Waterfall');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert('Please enter your Name and Phone Number!');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/custom-enquiries`, {
        customerName,
        phone,
        jarType,
        theme,
        budget: Number(budget) || 0,
        details
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setCustomerName('');
        setPhone('');
        setBudget('');
        setDetails('');
        onClose();
      }, 2000);

    } catch (err) {
      console.error('Error submitting custom request:', err);
      alert('Failed to submit custom request. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121c18] border border-emerald-800/60 rounded-3xl max-w-md w-full p-6 text-stone-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-stone-400 hover:text-white p-1 rounded-full bg-stone-900/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-emerald-100">Custom Terrarium Design</h3>
        </div>
        <p className="text-xs text-stone-400 mb-5">
          Tell us your vision and dimensions, we will craft it for you!
        </p>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-base font-bold text-emerald-200">Request Submitted!</h4>
            <p className="text-xs text-stone-400">Our artisan will contact you shortly on phone/WhatsApp.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">Your Name *</label>
              <div className="relative flex items-center">
                <User className="w-4 h-4 text-emerald-600 absolute left-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mehedi Hasan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0d1411] border border-emerald-900/60 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">Phone / WhatsApp *</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-emerald-600 absolute left-3" />
                <input
                  type="text"
                  required
                  placeholder="017xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#0d1411] border border-emerald-900/60 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">Glass Jar Size</label>
                <select
                  value={jarType}
                  onChange={(e) => setJarType(e.target.value)}
                  className="w-full px-3 py-2 bg-[#0d1411] border border-emerald-900/60 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Small Globe">Small Globe</option>
                  <option value="Medium Jar">Medium Jar</option>
                  <option value="Large Cylinder">Large Cylinder</option>
                  <option value="Geometric Tank">Geometric Tank</option>
                  <option value="Moss Wall Art">Moss Wall Art</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">Budget (৳ Approx)</label>
                <div className="relative flex items-center">
                  <Tag className="w-3.5 h-3.5 text-emerald-600 absolute left-3" />
                  <input
                    type="number"
                    placeholder="2500"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-[#0d1411] border border-emerald-900/60 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">Theme & Preferred Plants</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-3 py-2 bg-[#0d1411] border border-emerald-900/60 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="Forest Waterfall">Forest & Waterfall</option>
                <option value="Mountain Rock Scape">Mountain & Rock Scape</option>
                <option value="Minimalist Bonsai">Minimalist Bonsai</option>
                <option value="Dense Moss Jungle">Dense Moss Jungle</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-300 mb-1">Special Requirements</label>
              <textarea
                rows="2"
                placeholder="Mention specific plants, lighting, or figurines..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3 py-2 bg-[#0d1411] border border-emerald-900/60 rounded-xl text-xs text-stone-200 focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition active:scale-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Send Custom Enquiry'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}