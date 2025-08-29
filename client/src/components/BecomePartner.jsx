// export default BecomePartner;
import React from "react";
import { Link, useNavigate } from 'react-router-dom';

// Updated SVG icons to use `currentColor` for consistent styling.
const icons = {
  instagram: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110">
      <rect width="20" height="20" x="2" y="2" rx="6" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  ),
  twitter: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110">
      <path d="M22 5.92a8.38 8.38 0 01-2.36.65A4.13 4.13 0 0021.4 4.1a8.27 8.27 0 01-2.61 1A4.13 4.13 0 0012 8.13c0 .32.04.64.1.94A11.7 11.7 0 013 4.89a4.13 4.13 0 001.28 5.5A4.07 4.07 0 012.8 9.5v.05a4.13 4.13 0 003.31 4.05c-.2.05-.41.08-.62.08-.15 0-.3-.01-.45-.04a4.13 4.13 0 003.85 2.86A8.3 8.3 0 012 19.54a11.73 11.73 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0022 5.92z" fill="currentColor"/>
    </svg>
  ),
  mail: (
    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:scale-110">
      <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
};

const BecomePartner = () => (
  <div className="w-full my-16 font-sans">
    {/* --- FIX: Main container now matches the StatsSection theme --- */}
    <div 
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center rounded-3xl shadow-2xl overflow-hidden"
        // style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}
    >
      
      {/* Left Side: GIF */}
      <div className="flex items-center justify-center p-8 md:p-4">
        <img
          src="/partner.jpg"
          alt="Collaboration animation"
          className="w-full max-w-md object-contain rounded-2xl"
          loading="lazy"
        />
      </div>

      {/* Right Side: Content */}
      {/* --- FIX: Removed glassmorphism, updated text and button colors --- */}
      <div className="flex flex-col justify-center p-10 md:p-12">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">
            Become a Partner
          </h2>
          <p className="text-lg mb-8 text-gray-650">
          Join our mission to create lasting opportunities for students. As a trusted partner of 200+ leading corporates and foundations, Buddy4Study is dedicated to advancing education through:
          Scholarship Management Services (SMS) for streamlined administration
          Scholar Tracking System (STS) to monitor student progress
          Personalized mentorship to support academic growth
          Flexible education loans to ease financial burdens
          </p>
          
          <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <Link lable="become_partner" to="/create-scholarship" className="relative"> Become Partner</Link>
          </button>
          
          <div className="flex flex-col items-center text-center mt-8">
            <span className="mb-4 font-semibold text-gray-500">OR contact us on</span>
            <div className="flex items-center space-x-6 text-gray-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-600 group">{icons.instagram}</a>
              {/* <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-green-600 group">{icons.whatsapp}</a> */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-green-600 group">{icons.twitter}</a>
              <a href="mailto:info@example.com" aria-label="Mail" className="hover:text-green-600 group">{icons.mail}</a>
            </div>
          </div>
      </div>
    </div>
  </div>
);

export default BecomePartner;
