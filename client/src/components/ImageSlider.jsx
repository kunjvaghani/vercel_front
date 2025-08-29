// gemini code 
import React, { useState, useEffect, useRef } from "react";

// List your image filenames here.
// IMPORTANT: In a React/Vite project, place these images in the `public` folder
// at the root of your project. Then, reference them with a leading slash `/`.
const images = [
  "/i1.webp",
  "/i2.webp",
  "/i3.webp",
  "/i4.webp"
];

const sliderBg = "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)";
const arrowColor = "rgb(21 128 61)";
const arrowHoverColor = "rgb(34 197 94)";

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef(null);
  const sliderRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    const nextSlide = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Half a second for the fade-out
    };
    
    timeoutRef.current = setTimeout(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Handlers for manual navigation
  const goToSlide = (slideIndex) => {
    if (isTransitioning) return;
    clearTimeout(timeoutRef.current); // Reset auto-slide timer on manual interaction
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(slideIndex);
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrev = () => {
    const newIndex = (current - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = (current + 1) % images.length;
    goToSlide(newIndex);
  };

  // 3D Tilt Effect on Mouse Move
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = slider.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = (y / height - 0.5) * -15; // Rotate up to 7.5 degrees
      const rotateY = (x / width - 0.5) * 15;  // Rotate up to 7.5 degrees
      slider.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      slider.style.transform = 'perspective(1500px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    slider.addEventListener('mousemove', handleMouseMove);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      slider.removeEventListener('mousemove', handleMouseMove);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="relative w-full max-w-4xl mx-auto my-12 flex items-center justify-center transition-transform duration-700 ease-out"
      style={{
        minHeight: "450px",
        background: sliderBg,
        borderRadius: "2rem",
        boxShadow: "0 16px 40px rgba(21,128,61,0.15), 0 4px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Left Arrow */}
      <ArrowButton direction="left" onClick={goToPrev} />

      {/* Image Container with Cross-fade */}
      <div className="w-full h-[400px] relative">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`slide-${index}`}
            className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-500 ease-in-out"
            style={{
              opacity: index === current ? 1 : 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              border: "2px solid rgba(255,255,255,0.5)",
              transform: "translateZ(50px)" // Bring image forward in 3D space
            }}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <ArrowButton direction="right" onClick={goToNext} />

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? 'bg-green-700 scale-125' : 'bg-white/70 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Arrow Button Component
const ArrowButton = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute ${direction === 'left' ? 'left-5' : 'right-5'} z-20 flex items-center justify-center w-14 h-14 rounded-full shadow-lg group`}
    style={{
      background: 'rgba(255,255,255,0.3)',
      backdropFilter: 'blur(5px)',
      top: "50%",
      transform: "translateY(-50%)",
      border: "1px solid rgba(255,255,255,0.5)",
      outline: "none",
      cursor: "pointer",
      transition: "background 0.3s, box-shadow 0.3s"
    }}
    aria-label={direction === 'left' ? 'Previous' : 'Next'}
  >
    <div className="absolute inset-0 bg-green-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
         style={{boxShadow: `0 0 20px ${arrowHoverColor}`}}></div>
    <svg className="relative" width="28" height="28" fill="none" viewBox="0 0 24 24">
      <path
        d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
        stroke={arrowColor}
        className="group-hover:stroke-white transition-colors duration-300"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

export default ImageSlider;
