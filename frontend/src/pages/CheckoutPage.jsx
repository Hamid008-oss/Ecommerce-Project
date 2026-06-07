import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CardContext";

function CheckoutPage() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await authFetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Order placed successfully! Redirecting...");
        authFetch(`${BASEURL}/api/cart/`);
        clearCart();
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.error || "Failed to place order, Please try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred, Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex justify-center items-center p-6 pt-24">
      <div className="bg-[#1A1A1A] p-8 md:p-10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800 w-full max-w-xl relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none"></div>

        <h1 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide uppercase">
          Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Order</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 p-4 bg-[#121212] text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Shipping Address</label>
            <textarea
              name="address"
              placeholder="House, Street, City"
              value={form.address}
              onChange={handleChange}
              required
              rows="3"
              className="w-full mt-1 p-4 bg-[#121212] text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600 resize-none"
            ></textarea>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="03XX-XXXXXXX"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-4 bg-[#121212] text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-600"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold ml-1">Payment Method</label>
            <select
              name="payment_method"
              value={form.payment_method}
              onChange={handleChange}
              className="w-full mt-1 p-4 bg-[#121212] text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
            >
              <option value="COD">Cash On Delivery (COD)</option>
              <option value="CreditCard">Online Payment</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 font-bold py-4 rounded-xl transition-all duration-300 ${
              loading 
                ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
                : "bg-purple-600 text-white hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]"
            }`}
          >
            {loading ? "Processing Securely..." : "Confirm & Place Order"}
          </button>

          {message && (
            <div className={`mt-4 p-4 rounded-xl text-center text-sm font-semibold border ${
              message.includes('successfully') 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;