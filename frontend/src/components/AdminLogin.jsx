import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // এখানে আপনার এডমিন ইউজারনেম ও পাসওয়ার্ড দিয়ে যাচাই করুন
    // উদাহরণ: Phone: 01772818573, Password: admin
    if (phone === '01772818573' && password === 'admin') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.reload();
      }
    } else {
      setError('Invalid phone number or password!');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfbfa] text-stone-800 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Info */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            The Moss Wanderer Admin Portal
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight">
            Sign in with phone number and continue where you left off.
          </h1>
          
          <p className="text-stone-500 text-sm leading-relaxed">
            Secure admin access allows you to manage products, monitor orders, and control store inventory seamlessly.
          </p>
        </div>

        {/* Right Side Login Card */}
        <div className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-200/50">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-stone-900 mb-1">Welcome Back</h2>
            <p className="text-xs text-stone-500">Sign in with your phone number and password</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Field */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-stone-400 absolute left-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition duration-200"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-stone-400">
              Authorized personnel only. Need help? <span className="text-emerald-600 font-semibold cursor-pointer">Support</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}