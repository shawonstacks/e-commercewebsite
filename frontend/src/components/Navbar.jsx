import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav className="bg-[#f2f1ea] border-b border-[#d8d6c9] sticky top-0 z-40 px-4 py-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Side: Navigation Links (Stacked Vertically) */}
        <div className="flex flex-col gap-1 text-xs md:text-sm font-semibold tracking-wide text-[#1e2e24]">
          <a href="#" className="hover:text-[#43644f] transition-colors leading-tight">Home</a>
          <a href="#" className="hover:text-[#43644f] transition-colors leading-tight">Products</a>
          <a href="#" className="hover:text-[#43644f] transition-colors leading-tight">Category</a>
        </div>

        {/* Center/Right: Brand Logo & Custom SVG Leaf */}
        <div 
          className="flex flex-col items-center cursor-pointer py-0.5" 
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
          <span className="font-extrabold text-[11px] sm:text-xs md:text-sm tracking-[0.2em] text-[#0f1712] uppercase text-center">
            THE MOSS WANDERER
          </span>

          {/* Subtitle */}
          <div className="w-full flex items-center justify-center gap-1.5 mt-0.5">
            <span className="h-[1px] bg-[#1f382b] w-3 md:w-4"></span>
            <span className="text-[7.5px] md:text-[9px] font-bold tracking-[0.18em] text-[#1f382b] uppercase whitespace-nowrap">
              NATURE CONTAINED
            </span>
            <span className="h-[1px] bg-[#1f382b] w-3 md:w-4"></span>
          </div>
        </div>

        {/* Right Side: Cart Icon */}
        <div className="flex items-center">
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