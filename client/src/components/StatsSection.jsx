import React from "react";
import AnimatedNumber from "./AnimatedText";
import { Link } from "react-router-dom";
// --- Icon Components (as before) ---
const ScholarshipIcon = () => (
  <svg className="w-8 h-8 mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
);
const StudentsIcon = () => (
  <svg className="w-8 h-8 mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const FundIcon = () => (
    <svg className="w-8 h-8 mb-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const stats = [
  { icon: <ScholarshipIcon />, label: "Scholarships", value: 15000, format: v => v.toLocaleString() + "+" },
  { icon: <StudentsIcon />, label: "Students", value: 10000000, format: v => (v / 1000000).toFixed(1) + "M+" },
  { icon: <StudentsIcon />, label: "Students Helped", value: 128306, format: v => v.toLocaleString() + "+" },
  { icon: <FundIcon />, label: "Fund Managed", value: 600, format: v => `₹${v}+ Cr` },
];

const StatsSection = () => (
  // --- INCREASED WIDTH AND HEIGHT ---
  // Using a larger max-width and much more vertical padding (py-16)
  <div className="w-full max-w-7xl mx-auto my-16">  
    <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center text-center" style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}>
      
      {/* --- ADDED HASHTAGS --- */}
      <div className="font-semibold text-green-700 tracking-wider mb-6 py-auto px-auto text-center text-2xl ">
         #SCHOLARSHIPS_FOR_YOU
      </div>

      {/* --- STATS ROW --- */}
      <div className="w-full flex justify-around items-start flex-wrap gap-y-8 mb-12 mt-7 py-auto px-auto">
        {stats.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <div className="flex flex-col items-center flex-1 min-w-[200px] group transition-transform duration-300 hover:-translate-y-2">
              {stat.icon}
              <div className="text-xl font-semibold text-gray-700 mb-2">{stat.label}</div>
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                <AnimatedNumber value={stat.value} duration={2500} format={stat.format} />
              </div>
            </div>
            {idx < stats.length - 1 && <div className="hidden md:block h-24 w-px bg-green-200" />}
          </React.Fragment>
        ))}
      </div>

      {/* --- ADDED BUTTON --- */}
      <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-green-600 rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-green-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        <Link className="relative flex items-center cursor-pointer" to="/services">
          Find Schemes For You
          <svg className="ml-3 w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </Link>
      </button>

    </div>
  </div>
);

export default StatsSection;
