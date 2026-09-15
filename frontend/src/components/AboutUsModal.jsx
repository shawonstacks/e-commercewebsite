import React from 'react';
import { X, Leaf, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutUsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#141f1a] border border-emerald-900/60 rounded-2xl max-w-2xl w-full p-6 md:p-8 text-stone-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white bg-[#0d1411] p-2 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-emerald-400 mb-2">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs uppercase font-bold tracking-widest">Our Story & Passion</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-emerald-50 mb-4">
          About <span className="text-emerald-400">The Moss Wanderer</span>
        </h2>

        {/* Story Text */}
        <p className="text-stone-300 text-sm leading-relaxed mb-6">
          At <strong>The Moss Wanderer</strong>, we bring a slice of living nature directly into your home or office space. 
          Each terrarium and moss art piece is carefully handcrafted with living moss, exotic plants, and natural stones to create a self-sustaining miniature ecosystem.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-[#0d1411] p-4 rounded-xl border border-emerald-900/30">
            <Leaf className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="font-bold text-emerald-100 text-sm mb-1">Handcrafted Art</h4>
            <p className="text-stone-400 text-xs">Every design is unique, built manually with care and attention to detail.</p>
          </div>

          <div className="bg-[#0d1411] p-4 rounded-xl border border-emerald-900/30">
            <Heart className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="font-bold text-emerald-100 text-sm mb-1">Easy Care</h4>
            <p className="text-stone-400 text-xs">Self-sustaining ecosystems that require minimal watering and maintenance.</p>
          </div>

          <div className="bg-[#0d1411] p-4 rounded-xl border border-emerald-900/30">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
            <h4 className="font-bold text-emerald-100 text-sm mb-1">Safe Delivery</h4>
            <p className="text-stone-400 text-xs">Custom protective packaging to ensure safe delivery across Dhaka & BD.</p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/40 text-center">
          <p className="text-emerald-200 text-xs font-medium">
            🌿 "Bringing Nature Closer to Your Urban Life"
          </p>
        </div>

      </div>
    </div>
  );
}