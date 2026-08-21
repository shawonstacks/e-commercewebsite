import React, { useState } from 'react';
import { ShoppingBag, MoreVertical, X, User } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart, onOpenAuth, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f2f1ea] border-b border-[#d8d6c9] sticky top-0 z-40 px-4 py-2.5 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between relative">
        
        {/* Left Side: 3-Dot Menu Button & Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl bg-[#e5e3d8] border border-[#c4c1b2] hover:bg-[#dad7ca] transition-colors text-[#1f382b] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <MoreVertical className="w-5 h-5" />}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute left-0 mt-2 w-44 bg-[#f2f1ea] border border-[#c4c1b2] rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm font-semibold text-[#1e2e24] hover:bg-[#e5e3d8] transition-colors"
              >
                Home
              </a>
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm font-semibold text-[#1e2e24] hover:bg-[#e5e3d8] transition-colors"
              >
                Products
              </a>
              <a 
                href="#" 
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-sm font-semibold text-[#1e2e24] hover:bg-[#e5e3d8] transition-colors"
              >
                Category
              </a>
            </div>
          )}
        </div>

        {/* Center: Perfectly Centered Brand Logo */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer py-0.5" 
          onClick={() => window.location.href = '/'}
        >
          {/* Custom Leaf Icon */}
          <div className="w-7 h-7 md:w-8 md:h-8 mb-0.5">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Left Side - Dark Green */}
              <path d="M50 12 C 22 25, 18 68, 50 88 C 48 60, 46 32, 50 12 Z" fill="#1f382b" />
              {/* Right Side - Light Olive Green */}
              <path d="M50 12 C 78 25, 82 68, 50 88 C 52 60, 54 32, 50 12 Z" fill="#8da385" />
              {/* Left Inner Leaf Veins */}
              <path d="M 50 35 Q 36 32, 30 28 M 50 50 Q 34 46, 26 40 M 50 65 Q 36 60, 28 52 M 50 78 Q 40 73, 34 66" stroke="#f2f1ea" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Right Inner Leaf Veins */}
              <path d="M 50 35 Q 64 32, 70 28 M 50 50 Q 66 46, 74 40 M 50 65 Q 64 60, 72 52 M 50 78 Q 60 73, 66 66" stroke="#1f382b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Center Stem */}
              <path d="M50 12 L 50 94" stroke="#1f382b" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* Logo Title */}
          <span className="font-extrabold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-[#0f1712] uppercase text-center whitespace-nowrap">
            THE MOSS WANDERER
          </span>

          {/* Subtitle */}
          <div className="w-full flex items-center justify-center gap-1.5 mt-0.5">
            <span className="h-[1px] bg-[#1f382b] w-3 md:w-4"></span>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] font-bold tracking-[0.18em] text-[#1f382b] uppercase whitespace-nowrap">
              NATURE CONTAINED
            </span>
            <span className="h-[1px] bg-[#1f382b] w-3 md:w-4"></span>
          </div>
        </div>

        {/* Right Side: User Auth & Cart Buttons */}
        <div className="flex items-center gap-2">
          
          {/* User Profile / Login Button */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1e2e24]">{user.name}</span>
              <button onClick={onLogout} className="text-[10px] text-red-600 underline">Logout</button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="p-2 bg-[#e5e3d8] border border-[#c4c1b2] rounded-xl hover:bg-[#dad7ca] transition">
              <User className="w-4 h-4 text-[#1f382b]" />
            </button>
          )}

          {/* Cart Button */}
          <button 
            onClick={onOpenCart}
            className="relative bg-[#e5e3d8] border border-[#c4c1b2] p-2 md:p-2.5 rounded-xl hover:bg-[#dad7ca] transition-colors"
          >
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-[#1f382b]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1f382b] text-[#f2f1ea] font-bold text-[9px] w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </nav>
  );
}