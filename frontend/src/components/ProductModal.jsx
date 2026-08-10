import { X, ShoppingBag, Tag } from 'lucide-react';

function ProductModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in">
      <div className="bg-[#121d18] w-full max-w-2xl rounded-2xl overflow-hidden text-stone-200 border border-emerald-900/50 shadow-2xl relative flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/80 p-1.5 rounded-full text-stone-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 h-64 md:h-auto">
          <img 
            src={product.imageUrl && !product.imageUrl.includes('via.placeholder') 
              ? product.imageUrl 
              : "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600"} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-800/40 w-fit mb-3">
              <Tag className="w-3 h-3" />
              {product.category || "Terrarium"}
            </div>

            <h3 className="text-2xl font-bold text-emerald-50 mb-2">{product.name}</h3>
            <p className="text-emerald-300 text-xl font-extrabold mb-4">৳ {product.price}</p>
            
            <p className="text-stone-400 text-xs leading-relaxed border-t border-emerald-900/40 pt-3">
              {product.description || "A beautiful miniature garden inside a glass vessel, carefully designed to retain humidity and nurture tiny green worlds inside your room."}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-900/30">
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-3 rounded-xl transition text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Shopping Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductModal;