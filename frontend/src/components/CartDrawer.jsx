import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

function CartDrawer({ isOpen, onClose, cart, setCart, onCheckout }) {
  if (!isOpen) return null;

  const increaseQuantity = (id) => {
    setCart(cart.map(item => 
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item._id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#121d18] w-full max-w-md h-full text-stone-200 p-6 flex flex-col justify-between shadow-2xl border-l border-emerald-900/50">
        
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-emerald-900/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-lg text-emerald-100">Your Cart</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-emerald-900/40 rounded-lg transition text-stone-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {cart.length === 0 ? (
              <div className="text-center py-12 text-stone-400">
                <p>Your cart is empty.</p>
                <p className="text-xs text-stone-500 mt-1">Add some terrariums to bring nature home!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="flex gap-4 p-3 rounded-xl bg-[#182620] border border-emerald-900/30 items-center justify-between">
                  <img 
                    src={item.imageUrl && !item.imageUrl.includes('via.placeholder') ? item.imageUrl : "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600"} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded-lg border border-emerald-900/40"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-emerald-100">{item.name}</h4>
                    <p className="text-xs text-emerald-400 mt-0.5">৳ {item.price}</p>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => decreaseQuantity(item._id)} className="p-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded border border-emerald-800/40">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-stone-200">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item._id)} className="p-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 rounded border border-emerald-800/40">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => removeItem(item._id)} className="text-stone-500 hover:text-red-400 transition p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="pt-4 border-t border-emerald-900/40">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-stone-400">Total Amount:</span>
              <span className="text-xl font-extrabold text-emerald-300">৳ {totalPrice}</span>
            </div>
            <button 
              onClick={() => { onClose(); onCheckout(); }}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold py-3 rounded-xl transition text-sm shadow-lg shadow-emerald-900/40"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartDrawer;