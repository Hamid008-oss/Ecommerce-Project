import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";
import { clearTokens, getAccessToken } from "../utils/auth";

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };
  return (
    <nav className="sticky top-0 z-50 bg-[#0c022ee6]/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex justify-between items-center shadow-md w-full">
      <Link to="/" className="text-2xl font-bold text-gray-200">
        Cloud Cartel➖💨
      </Link>

      <div className="flex items-center gap-6">
        {/*Login/Signup or Logout */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-400 hover:text-white font-medium transition-colors duration-300 px-4 py-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-purple-600 text-white font-medium px-5 py-2 rounded-lg hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.6)] transition-all duration-300"
            >
              Sign up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-purple-600 text-white font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-500 hover:shadow-[0_0_15px_rgba(147,51,234,0.6)] transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>

      {/* Premium Cart Button with Neon Badge */}
      <Link
        to="/cart"
        className="relative inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
      >
        {/* Cart Icon (Agar pehle se koi icon hai to wo rehne dein, warna yeh use karein) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        Cart
        {/* 🔴 Neon Badge for Cart Items */}
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-6 h-6 bg-rose-500 text-white text-xs font-extrabold px-1.5 rounded-full border-2 border-[#121212] shadow-[0_0_15px_rgba(225,29,72,0.8)] animate-pulse">
            {cartItems.length}
          </span>
        )}
      </Link>
    </nav>
  );
}

export default Navbar;
