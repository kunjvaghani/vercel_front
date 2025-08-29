// gemini 3 
import React, { useState } from 'react';
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';

// --- SVG Icons for Contact Info ---
const LocationIcon = () => (
    <svg className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
);
const MailIcon = () => (
    <svg className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);
const PhoneIcon = () => (
    <svg className="w-6 h-6 mr-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const AboutUsPage = () => (
    <div className="animate-fade-in-up bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
            <div className="text-center">
                <h2 className="text-lg font-semibold text-green-600 tracking-wide uppercase">About Us</h2>
                <p className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Empowering Students, Shaping Futures
                </p>
                <p className="mt-5 max-w-3xl mx-auto text-xl text-gray-500">
                    Our mission is to bridge the gap between students and the scholarships that can change their lives. We believe every student deserves the opportunity to pursue their dreams without financial barriers.
                </p>
            </div>
            <div className="mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Our Vision</h3>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            We envision a world where education is accessible to all. Our platform is a comprehensive, one-stop solution for students seeking financial aid and for organizations looking to make a meaningful impact.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <img className="rounded-2xl shadow-2xl w-full max-w-md" src="https://placehold.co/600x400/e6f7f6/15803d?text=Our+Vision" alt="Our Vision" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);


const ContactUsPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(
            'service_tvfhi3q',    // replace with your EmailJS service ID
            'template_lrlkuit',   // replace with your EmailJS template ID
            e.target,
            'Sbm1vpbFPFrd9jE2o'     // replace with your EmailJS public key
        ).then(() => {
            alert("Message sent successfully!");
            e.target.reset();  // clear form
        }).catch((error) => {
            console.error("EmailJS error:", error);
            alert("Failed to send message. Please try again.");
        });
    };

    return (
        <div className="animate-fade-in-up bg-white">
            <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-green-600 tracking-wide uppercase">Contact Us</h2>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900">We'd love to hear from you</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                                <input type="text" name="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" name="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea name="message" rows={4} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full px-6 py-3 rounded-md text-white bg-green-600 hover:bg-green-700">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Map Embed (unchanged) */}
                    <div>
                        <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=..."
                                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



const FAQPage = () => {
    const faqs = [
        {
            q: "What is this Scholarship Portal?",
            a: "It is a one-stop platform for students to find and apply for scholarships from various organizations."
        },
        {
            q: "How does this portal help citizens?",
            a: "It simplifies the process of finding financial aid, making education more accessible to everyone."
        },
        {
            q: "Can I apply for scholarships through this portal?",
            a: "Yes, our platform provides a streamlined application process for many of the listed scholarships."
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <div
            className="animate-fade-in-up"
            style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}
        >
            <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-lg font-semibold text-green-600 tracking-wide uppercase">FAQs</h2>
                    <h1 className="mt-2 text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our scholarship portal and how it helps students.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Image */}
                    <div className="flex justify-center">
                        <img
                            src="https://placehold.co/400x350/22c55e/FFFFFF?text=?"
                            alt="FAQ Visual"
                            className="w-full max-w-sm rounded-2xl shadow-xl"
                        />
                    </div>

                    {/* Right FAQ Accordion */}
                    <div>
                        <dl className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4">
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex justify-between items-center text-left text-gray-800 font-medium text-lg focus:outline-none"
                                    >
                                        <span>{faq.q}</span>
                                        <svg
                                            className={`w-6 h-6 transform transition-transform duration-300 ${
                                                openIndex === index ? '-rotate-180 text-green-600' : 'rotate-0'
                                            }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                            openIndex === index ? 'max-h-40 mt-3' : 'max-h-0'
                                        }`}
                                    >
                                        <p className="text-gray-600">{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TermsAndConditionsPage = () => (
    <div className="animate-fade-in-up bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg text-gray-600">
            <h1 className="text-gray-900">Terms and Conditions</h1>
            <p>Welcome to our Scholarship Portal. By using this website, you agree to comply with and be bound by the following terms and conditions.</p>
            <h2>1. User Agreement</h2>
            <p>Your use of this website is subject to these terms. If you disagree with any part of these terms and conditions, please do not use our website.</p>
        </div>
    </div>
);

const Footer = () => {
    const socialLinks = [
        { icon: <FaLinkedinIn />, href: "#" },
        { icon: <FaFacebookF />, href: "#" },
        { icon: <FaTwitter />, href: "#" },
        { icon: <FaInstagram />, href: "#" },
    ];

    const quickLinks = [
        { name: "About Us", path: "/about" },
        { name: "Contact Us", path: "/contact" },
        { name: "FAQPage", path: "/faq" },
        { name: "Terms & Conditions", path: "/terms" },
    ];

    return (
        // --- FIX: Changed background color to match website theme ---
        <footer
            className="text-gray-700 font-sans relative overflow-hidden"
            style={{ backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #e6f7f6 100%)' }}
        >
            {/* Decorative SVG Wave */}
            <div className="absolute top-0 left-0 w-full h-30 text-white ">
                <svg viewBox="0 0 1440 120" fill="currentColor">
                    <path d="M1440,21.2101911 C1200,57.7142857 960,75.952381 720,75.952381 C480,75.952381 240,57.7142857 0,21.2101911 L0,120 L1440,120 L1440,21.2101911 Z"></path>
                </svg>
            </div>

            <div className="container mx-auto pt-24 pb-12 px-6 md:px-12 relative z-10 text-2lg font-semibold">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Column 1: Branding & Social */}
                    <div className="footer-col">
                        <h2 className="text-gray-800 text-3xl font-bold mb-4">
                            <span className="text-green-600">Scholarship</span>Portal
                        </h2>
                        <div className="pl-5 justify-center items-center">
                            <p className="text-base mb-2 text-base">Powered by</p>
                            <img src="/f1.png" alt="Digital India" className="w-28 mb-4" />
                            <div className="flex gap-5 mt-7 text-gray-500 text-2xl">
                                {socialLinks.map((link, i) => (
                                    <a key={i} href={link.href} className="transition-transform duration-300 hover:text-green-600 hover:scale-110">
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <h3 className="text-gray-800 text-xl font-semibold mb-6">Quick Links</h3>
                        {/* --- FIX: Increased font size and removed specified links --- */}
                        <ul className="space-y-3 text-base text-4xl">
                            {quickLinks.map((link, i) => (
                                <li key={i}>
                                    <Link to={link.path} className="flex items-center transition-all duration-300 hover:text-green-600 hover:translate-x-1">
                                        <span className="mr-2 text-green-600 font-bold">&rarr;</span> {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Useful Links */}
                    <div className="footer-col">
                        <h3 className="text-gray-800 text-xl font-semibold mb-6">Useful Links</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                "/f1.png", "/f2.png", "/f3.png",
                                "/f4.png", "/f5.png", "/f6.png"
                            ].map((src, i) => (
                                <a href="#" key={i} className="bg-white p-2 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200">
                                    <img src={src} alt="link-logo" className="w-full h-10 object-contain" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div className="footer-col font-semibold">
                        <h3 className="text-gray-800 text-xl font-semibold mb-6">Get in touch</h3>
                        {/* --- FIX: Increased font size --- */}
                        <ul className="space-y-4 text-base">
                            <li className="flex items-start">
                                <LocationIcon />
                                <span>4th Floor, NeGD, Electronics Niketan, 6 CGO Complex, Lodhi Road, New Delhi - 110003, India</span>
                            </li>
                            <li className="flex items-center">
                                <MailIcon />
                                <span>kunj_______ss@gmail.com</span>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon />
                                <span>(+91) 1234567890 (9:00 AM - 5:30 PM)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-green-200 pt-6 text-sm text-center text-gray-600">
                    <p>&copy; {new Date().getFullYear()} myScheme. All Rights Reserved. | Last Updated: 24/07/2025</p>
                </div>
            </div>



            {/* CSS for animations */}
            <style>{`
        .footer-col {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        /* Staggered animation delays */
        .footer-col:nth-child(1) { animation-delay: 0.1s; }
        .footer-col:nth-child(2) { animation-delay: 0.2s; }
        .footer-col:nth-child(3) { animation-delay: 0.3s; }
        .footer-col:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
        </footer>
    );
};

export { AboutUsPage, ContactUsPage, FAQPage, TermsAndConditionsPage };
export default Footer;


