import React, { useState, useEffect } from "react";

function HeroBanner() {
  // 1. Carousel ka Data (Aap yahan apni marzi se text aur colors change kar sakte hain)
  const slides = [
    {
      id: 1,
      badge: "🚀 New Arrival",
      title: "Elevate Your",
      highlight: "Street Style",
      desc: "Premium vapes, exclusive streetwear, and unmatched vibes. Welcome to the Cloud Cartel.",
      btnText: "Shop Wear",
      glowTheme: "purple", // Purple theme for clothes
      image: "public/img1.jpeg",
    },
    {
      id: 2,
      badge: "💨 Premium Quality",
      title: "Discover Best",
      highlight: "Vape Pods",
      desc: "Experience the smoothest hits with our latest collection of premium pods and e-liquids.",
      btnText: "Explore Vapes",
      glowTheme: "emerald", // Green theme for vapes
      image: "public/img2.jpeg",
    },
    {
      id: 3,
      badge: "💥 Flash Sale",
      title: "Winter",
      highlight: "Collection",
      desc: "Get up to 40% off on all hoodies, joggers, and street accessories. Limited time only.",
      btnText: "View Offers",
      glowTheme: "rose", // Red theme for sale
      image: "public/img3.jpeg",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // 2. Auto-play Logic (Har 5 second baad slide change hogi)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full bg-[#121212] overflow-hidden border-b border-gray-800 group">
      {/* 3. Slider Container jo horizontally move karta hai */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => {
          // Dynamic colors handle karne ke liye (Tailwind dynamic classes ko properly support nahi karta isliye conditionals use kar rahe hain)
          const isPurple = slide.glowTheme === "purple";
          const isEmerald = slide.glowTheme === "emerald";

          return (
            <div key={slide.id} className="min-w-full relative shrink-0">
              {/* Background Glow */}
              <div
                className={`absolute top-10 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none ${
                  isPurple
                    ? "bg-purple-600/20"
                    : isEmerald
                      ? "bg-emerald-600/20"
                      : "bg-rose-600/20"
                }`}
              ></div>

              <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col-reverse md:flex-row items-center justify-between gap-10 relative z-10">
                {/* Left Side Text */}
                <div className="w-full md:w-1/2 flex flex-col items-start space-y-6 text-left">
                  <div
                    className={`inline-block px-4 py-1.5 rounded-full border text-sm font-semibold tracking-wider uppercase ${
                      isPurple
                        ? "border-purple-500/30 bg-purple-500/10 text-purple-400"
                        : isEmerald
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border-rose-500/30 bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {slide.badge}
                  </div>

                  <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight uppercase tracking-tight">
                    {slide.title} <br />
                    <span
                      className={`text-transparent bg-clip-text bg-linear-to-r ${
                        isPurple
                          ? "from-purple-400 to-purple-600"
                          : isEmerald
                            ? "from-emerald-400 to-emerald-600"
                            : "from-rose-400 to-rose-600"
                      }`}
                    >
                      {slide.highlight}
                    </span>
                  </h1>

                  <p className="text-gray-400 text-lg md:text-xl max-w-md">
                    {slide.desc}
                  </p>

                  <button
                    className={`text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 ${
                      isPurple
                        ? "bg-purple-600 hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(147,51,234,0.6)]"
                        : isEmerald
                          ? "bg-emerald-600 hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]"
                          : "bg-rose-600 hover:bg-rose-500 hover:shadow-[0_0_20px_rgba(225,29,72,0.6)]"
                    }`}
                  >
                    {slide.btnText}
                  </button>
                </div>

                {/* Right Side Image Placeholder */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
                  <div
                    className={`w-64 h-64 md:w-96 md:h-96 rounded-full border flex items-center justify-center overflow-hidden z-10 relative ${
                      isPurple
                        ? "bg-linear-to-tr from-purple-900/40 to-gray-800/40 border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.2)]"
                        : isEmerald
                          ? "bg-linear-to-tr from-emerald-900/40 to-gray-800/40 border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
                          : "bg-linear-to-tr from-rose-900/40 to-gray-800/40 border-rose-500/20 shadow-[0_0_50px_rgba(225,29,72,0.2)]"
                    }`}
                  >
                    {/* 👇 Image tag lagaya hai */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-center mix-blend-overlay hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Dots Indicators (Neeche wale chote buttons) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-8 bg-white"
                : "w-2 bg-gray-600 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* 5. Next/Prev Arrows (Optional: Jab hover karein tab dikhein) */}
      <button
        onClick={() =>
          setCurrentSlide(
            currentSlide === 0 ? slides.length - 1 : currentSlide - 1,
          )
        }
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black border border-gray-700"
      >
        ❮
      </button>
      <button
        onClick={() =>
          setCurrentSlide(
            currentSlide === slides.length - 1 ? 0 : currentSlide + 1,
          )
        }
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black border border-gray-700"
      >
        ❯
      </button>
    </div>
  );
}

export default HeroBanner;
