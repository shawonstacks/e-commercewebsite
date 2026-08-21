import React, { useState } from 'react';
import { X, User, Lock, Mail } from 'lucide-react';
import axios from 'axios';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';

    try {
      const res = await axios.post(`${API_BASE_URL}${endpoint}`, formData);
      localStorage.setItem('userToken', res.data.token);
      localStorage.setItem('userData', JSON.stringify(res.data.user));
      onLoginSuccess(res.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#f2f1ea] border border-[#c4c1b2] w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-[#1f382b] hover:opacity-75">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-[#0f1712] mb-1">
          {isRegister ? 'Create an Account' : 'Welcome Back'}
        </h3>
        <p className="text-xs text-stone-600 mb-6">
          {isRegister ? 'Join us to track orders easily' : 'Log in to your account'}
        </p>

        {error && <div className="bg-red-100 text-red-700 text-xs p-2.5 rounded-lg mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <div>
              <label className="text-xs font-semibold text-[#1e2e24]">Full Name</label>
              <div className="flex items-center gap-2 bg-[#e5e3d8] border border-[#c4c1b2] rounded-xl px-3 py-2 mt-1">
                <User className="w-4 h-4 text-stone-500" />
                <input
                  type="text"
                  required
                  className="bg-transparent text-xs w-full outline-none text-[#0f1712]"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-[#1e2e24]">Email Address</label>
            <div className="flex items-center gap-2 bg-[#e5e3d8] border border-[#c4c1b2] rounded-xl px-3 py-2 mt-1">
              <Mail className="w-4 h-4 text-stone-500" />
              <input
                type="email"
                required
                className="bg-transparent text-xs w-full outline-none text-[#0f1712]"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#1e2e24]">Password</label>
            <div className="flex items-center gap-2 bg-[#e5e3d8] border border-[#c4c1b2] rounded-xl px-3 py-2 mt-1">
              <Lock className="w-4 h-4 text-stone-500" />
              <input
                type="password"
                required
                className="bg-transparent text-xs w-full outline-none text-[#0f1712]"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1f382b] hover:bg-[#2e523f] text-[#f2f1ea] font-bold py-2.5 rounded-xl text-xs transition mt-4"
          >
            {isRegister ? 'Register' : 'Log In'}
          </button>
        </form>

        <p className="text-xs text-center text-stone-600 mt-4">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="font-bold text-[#1f382b] underline"
          >
            {isRegister ? 'Log In' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}