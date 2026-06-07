import { useCart } from "../context/CardContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  console.log("Cart Items:", cartItems);

  return (
    <div className="pt-24 min-h-screen p-6 bg-[#121212] text-gray-200">
      <h1 className="text-4xl font-extrabold mb-8 text-center uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          <p className="text-xl text-gray-500 font-medium">Your cart is feeling a bit empty.</p>
          <Link to="/" className="text-purple-400 border border-purple-500/30 px-6 py-2 rounded-full hover:bg-purple-600/10 transition-all">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-[#1A1A1A] p-6 md:p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800 relative">
          
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#121212] border border-gray-800 rounded-2xl hover:border-purple-500/30 transition-colors"
              >
                {/* Product Info & Image */}
                <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
                  {item.product_image && (
                    <div className="bg-[#1A1A1A] p-2 rounded-xl border border-gray-800">
                      <img
                        src={`${BASEURL}${item.product_image}`}
                        alt={item.product_name}
                        className="w-16 h-16 object-contain rounded"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-lg font-bold text-white">{item.product_name}</h2>
                    <p className="text-purple-400 font-semibold">Rs. {item.product_price}</p>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center bg-[#1A1A1A] border border-gray-700 rounded-lg overflow-hidden">
                    <button
                      className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4 font-bold text-white">{item.quantity}</span>
                    <button
                      className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 transition"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button
                    className="text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 p-2 rounded-lg transition"
                    onClick={() => removeFromCart(item.id)}
                    title="Remove Item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout Section */}
          <div className="border-t border-gray-800 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wider">Subtotal</p>
              <p className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                Rs. {total}
              </p>
            </div>
            <Link
              to="/checkout"
              className="w-full sm:w-auto bg-purple-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-300 text-center"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;