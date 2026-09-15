import React, { useState } from 'react';
import { 
  ShieldCheck, Truck, RotateCcw, Headphones, Home, 
  ShoppingBag, Grid, Info, Mail, HelpCircle, Phone, 
  MapPin, Globe, X 
} from 'lucide-react';
import AboutUsModal from './AboutUsModal';

function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'help', 'shipping', 'returns'

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full mt-16 font-sans text-stone-300">
      {/* 1. Trust Badges */}
      <div className="bg-[#121d18] border-y border-emerald-900/40 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h4 className="font-semibold text-emerald-100 text-sm">Secure Payment</h4>
            <p className="text-xs text-stone-400">100% Secure Checkout</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-8 h-8 text-emerald-400" />
            <h4 className="font-semibold text-emerald-100 text-sm">Fast Delivery</h4>
            <p className="text-xs text-stone-400">Nationwide Express Shipping</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <RotateCcw className="w-8 h-8 text-emerald-400" />
            <h4 className="font-semibold text-emerald-100 text-sm">Easy Returns</h4>
            <p className="text-xs text-stone-400">Hassle-free replacement</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Headphones className="w-8 h-8 text-emerald-400" />
            <h4 className="font-semibold text-emerald-100 text-sm">24/7 Support</h4>
            <p className="text-xs text-stone-400">Dedicated Customer Help</p>
          </div>
        </div>
      </div>

      {/* 2. Main Dark Footer */}
      <div className="bg-[#0a0f0d] border-t border-emerald-950 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-xl text-stone-950 font-black">TM</div>
              <h3 className="text-xl font-black text-emerald-100 tracking-wider">The Moss Wanderer</h3>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Your trusted destination for premium terrariums, moss art, and living nature for your home or workspace.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://themosswanderer.com" 
                target="_blank" 
                rel="noreferrer" 
                className="bg-[#121d18] hover:bg-emerald-600 hover:text-stone-950 p-2.5 rounded-full border border-emerald-900/50 transition"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => scrollToSection('top')}
              >
                <Home className="w-3.5 h-3.5" /> 
                <span>Home</span>
              </li>
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => scrollToSection('products-section')}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> 
                <span>Products</span>
              </li>
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => scrollToSection('filter-section')}
              >
                <Grid className="w-3.5 h-3.5" /> 
                <span>Categories</span>
              </li>
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => setIsAboutOpen(true)}
              >
                <Info className="w-3.5 h-3.5 text-emerald-400" /> 
                <span>About Us</span>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => setActiveModal('help')}
              >
                <HelpCircle className="w-3.5 h-3.5" /> 
                <span>Help Center</span>
              </li>
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => setActiveModal('shipping')}
              >
                <Truck className="w-3.5 h-3.5" /> 
                <span>Shipping Info</span>
              </li>
              <li 
                className="flex items-center gap-2 cursor-pointer hover:text-emerald-400 transition"
                onClick={() => setActiveModal('returns')}
              >
                <RotateCcw className="w-3.5 h-3.5" /> 
                <span>Returns & Refunds</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li>
                <a href="tel:+8801772818573" className="flex items-center gap-2.5 hover:text-emerald-400 transition">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+880 1772-818573</span>
                </a>
              </li>
              <li>
                <a href="mailto:themosswanderer@gmail.com" className="flex items-center gap-2.5 hover:text-emerald-400 transition">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>themosswanderer@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-emerald-950 text-center text-[11px] text-stone-500">
          © {new Date().getFullYear()} The Moss Wanderer. All rights reserved.
        </div>
      </div>

      {/* About Us Modal */}
      <AboutUsModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />

      {/* Support Info Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141f1a] border border-emerald-800/60 text-stone-200 w-full max-w-md rounded-2xl p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 bg-[#0d1411] border border-emerald-900/50 rounded-full text-stone-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'help' && (
              <div>
                <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 mb-3">
                  <HelpCircle className="w-5 h-5" /> Help Center
                </h3>
                <div className="text-xs text-stone-300 space-y-2 border-t border-emerald-900/40 pt-3">
                  <p><strong>Q: How do I care for my terrarium?</strong></p>
                  <p className="text-stone-400">A: Keep it in indirect light and spray water only when the moss looks dry (usually once every 2-3 weeks).</p>
                  <p className="pt-2"><strong>Q: Do you offer custom designs?</strong></p>
                  <p className="text-stone-400">A: Yes! You can message us on WhatsApp for custom orders.</p>
                </div>
              </div>
            )}

            {activeModal === 'shipping' && (
              <div>
                <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5" /> Shipping Information
                </h3>
                <div className="text-xs text-stone-300 space-y-2 border-t border-emerald-900/40 pt-3">
                  <p>• <strong>Dhaka City:</strong> Delivery within 24–48 hours.</p>
                  <p>• <strong>Outside Dhaka:</strong> Delivery within 3–5 business days.</p>
                  <p>• All live plant products are packed with extra care to ensure safe arrival.</p>
                </div>
              </div>
            )}

            {activeModal === 'returns' && (
              <div>
                <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2 mb-3">
                  <RotateCcw className="w-5 h-5" /> Returns & Replacement
                </h3>
                <div className="text-xs text-stone-300 space-y-2 border-t border-emerald-900/40 pt-3">
                  <p>• If your glass vessel or plant is damaged during transit, please notify us within <strong>24 hours</strong> of delivery with a picture/video.</p>
                  <p>• We will process a free replacement or refund accordingly.</p>
                </div>
              </div>
            )}

            <div className="mt-5 text-right">
              <button 
                onClick={() => setActiveModal(null)}
                className="bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs px-4 py-1.5 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;