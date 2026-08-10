import { ShoppingBag, Leaf, ChevronDown } from 'lucide-react';

function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav className="sticky top-0 z-30 bg-[#0d1411]/90 backdrop-blur-md border-b border-emerald-900/40 px-4 py-3">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-stone-300">
          <a href="#" className="hover:text-emerald-400 transition">Home</a>
          <a href="#" className="hover:text-emerald-400 transition">Products</a>
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-emerald-400 transition">
            <span>Category</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
          <div className="bg-emerald-600 p-2 rounded-xl text-stone-950">
            <Leaf className="w-5 h-5 fill-current" />
          </div>
          <h1 className="text-xl font-black text-emerald-100 tracking-wider hidden sm:block">
            The Moss Wanderer
          </h1>
        </div>

        {/* Cart Icon */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#141f1a] border border-emerald-900/50 rounded-xl text-emerald-300 hover:border-emerald-600/50 transition active:scale-95"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-stone-950 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;