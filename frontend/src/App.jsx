import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ProductModal from './components/ProductModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import { Leaf, Sparkles, MessageCircle } from 'lucide-react';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const whatsappNumber = "8801715985372"; 
  const whatsappMessage = encodeURIComponent("Hello! I want to know more about your Moss Terrariums.");

  // ডায়নামিক Hostname দিয়ে API Call
  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [API_BASE_URL]);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => 
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ইমেজ URL সার্ভারের IP/Domain অনুযায়ী ফিক্স করার ফাংশন
  const getImageUrl = (url) => {
    if (!url || url.includes('via.placeholder')) {
      return "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600";
    }
    return url.replace('localhost', window.location.hostname);
  };

  if (window.location.pathname === '/admin') {
    return <AdminPanel onBack={() => window.location.href = '/'} />;
  }

  return (
    <div className="min-h-screen bg-[#0d1411] text-stone-200 font-sans relative flex flex-col justify-between">
      <div>
        <Navbar cartCount={totalCartCount} onOpenCart={() => setIsCartOpen(true)} />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart} 
          setCart={setCart} 
          onCheckout={() => setIsCheckoutOpen(true)}
        />

        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          cart={cart} 
          setCart={setCart} 
        />

        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
          onAddToCart={addToCart} 
        />

        {/* Floating WhatsApp Button */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-stone-950 p-3.5 rounded-full shadow-2xl transition duration-300 flex items-center gap-2 text-xs font-bold active:scale-95 group"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-stone-950" />
          <span className="hidden group-hover:inline-block pr-1">Chat with Us</span>
        </a>

        {/* Banner Section */}
        <header className="relative my-6 text-center max-w-4xl mx-auto px-4 py-8 rounded-2xl bg-gradient-to-b from-[#182620] to-[#0d1411] border border-emerald-900/40">
          <div className="inline-flex items-center gap-2 bg-emerald-950/80 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-800/50 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Tiny Worlds of Green
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-emerald-50 tracking-tight">
            Nature, Curated for Your Space.
          </h2>
          <p className="text-stone-400 text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Terrariums, Moss Art & Miniature Gardens crafted to bring a slice of living nature right into your home.
          </p>
        </header>

        {/* Products Grid */}
        <section className="max-w-6xl mx-auto px-4 mt-10">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-100">Our Handcrafted Terrariums</h3>
          </div>

          {/* Grid layout - Mobiles: 2 columns, Desktop: 3/4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="bg-[#141f1a] border border-emerald-900/40 rounded-xl overflow-hidden hover:border-emerald-600/50 transition duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div onClick={() => setSelectedProduct(product)}>
                  {/* Image Height Reduced to h-36 on mobile, h-44 on desktop */}
                  <div className="w-full h-36 sm:h-44 overflow-hidden bg-[#0d1411]">
                    <img 
                      src={getImageUrl(product.imageUrl)} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <span className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/40">
                      {product.category || "Terrarium"}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold mt-2 text-emerald-50 group-hover:text-emerald-300 transition line-clamp-1">{product.name}</h4>
                    <p className="text-stone-400 text-[11px] sm:text-xs mt-1 leading-relaxed line-clamp-2">{product.description}</p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 pt-0 mt-auto flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center border-t border-emerald-900/30">
                  <div>
                    <span className="text-[10px] text-stone-400 block sm:hidden">Price</span>
                    <span className="text-sm sm:text-base font-bold text-emerald-300">৳ {product.price}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold px-3 py-1.5 rounded-lg text-[11px] sm:text-xs transition active:scale-95 shadow-md shadow-emerald-900/30 text-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default App;