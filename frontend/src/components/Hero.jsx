import React, { useState, useEffect } from 'react';

export default function Hero() {
  // Background Terrarium Images
  const heroImages = [
    "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=1200&q=80",
    "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=1200&q=80",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80"
  ];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Auto Slider (Every 4 Seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="relative w-full max-w-6xl mx-auto my-6 rounded-3xl overflow-hidden border border-[#0d3829] shadow-2xl bg-[#091a13]">
      
      {/* Standard Speed Infinite Marquee CSS */}
      <style>{`
        @keyframes marqueeSmooth {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marqueeSmooth 35s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. BACKGROUND IMAGE SLIDER */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentImgIndex ? 'opacity-40' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        {/* Dark Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B08] via-[#050B08]/70 to-transparent" />
      </div>

      {/* 2. CONTENT AREA */}
      <div className="relative z-10 p-8 md:p-12 text-center space-y-6">
        
        {/* SHINING BADGE */}
        <div className="inline-flex items-center gap-2 bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
          <span>✨ Tiny Worlds of Green</span>
        </div>

        {/* MAIN TITLE */}
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
          Nature, Curated for Your Space.
        </h1>

        {/* MARQUEE TEXT (Smooth & Standard Speed) */}
        <div className="w-full overflow-hidden whitespace-nowrap py-2.5 border-y border-emerald-900/40 bg-[#050B08]/60 backdrop-blur-md rounded-xl">
          <div className="marquee-container text-emerald-300 font-medium text-sm md:text-base">
            <span className="px-4">
              Terrariums, Moss Art & Miniature Gardens crafted to bring a slice of living nature right into your home.&nbsp;&nbsp;&nbsp;✦
            </span>
            <span className="px-4">
              Terrariums, Moss Art & Miniature Gardens crafted to bring a slice of living nature right into your home.&nbsp;&nbsp;&nbsp;✦
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}