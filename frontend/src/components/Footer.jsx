import { ShieldCheck, Truck, RotateCcw, Headphones, Home, ShoppingBag, Grid, Info, Mail, HelpCircle, Phone, MapPin, Globe } from 'lucide-react';

function Footer() {
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
              <a href="#" className="bg-[#121d18] hover:bg-emerald-600 hover:text-stone-950 p-2.5 rounded-full border border-emerald-900/50 transition">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2"><Home className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">Home</a></li>
              <li className="flex items-center gap-2"><ShoppingBag className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">Products</a></li>
              <li className="flex items-center gap-2"><Grid className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">Categories</a></li>
              <li className="flex items-center gap-2"><Info className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2"><HelpCircle className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">Help Center</a></li>
              <li className="flex items-center gap-2"><Truck className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">Shipping Info</a></li>
              <li className="flex items-center gap-2"><RotateCcw className="w-3.5 h-3.5" /> <a href="#" className="hover:text-emerald-400 transition">Returns & Refunds</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+880 1715-985372</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>themosswanderer@gmail.com</span>
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
    </footer>
  );
}

export default Footer;