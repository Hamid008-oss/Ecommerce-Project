import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const response = await fetch(`${BASE}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        saveTokens(data);
        setMsg("Login Successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setMsg(
          data.detail ||
            "Login failed, Please try again with valid credentials.",
        );
      }
    } catch (error) {
      console.error(error)
      setMsg("An error occured, Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#121212]">
      <div className="max-w-md w-full bg-[#1A1A1A] p-8 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-gray-800 relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/20 rounded-full blur-[60px] pointer-events-none"></div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 uppercase tracking-wider relative z-10">
          Welcome Back
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Username"
              required
              className="w-full p-4 bg-[#121212] text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-500"
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Password"
              required
              className="w-full p-4 bg-[#121212] text-gray-200 border border-gray-700 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-gray-500"
            />
          </div>
          
          <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.6)] transition-all duration-300 mt-2">
            Login
          </button>
        </form>

        {msg && (
          <p className={`mt-4 text-center text-sm font-medium ${msg.includes('Success') ? 'text-emerald-400' : 'text-rose-400'}`}>
            {msg}
          </p>
        )}
        
        <div className="mt-6 text-center text-gray-400 text-sm relative z-10">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;