import React from 'react';
import '../styles/index.css';

const Footer = () => {
  return (
    <footer className="bg-[#F9F9F9] text-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">

          {/* Logo and Text */}
          <div className="flex flex-col items-start">
            <img src="/assets/image/logo.png" alt="NutriCheck" className="h-20 mb-3" />
            <p className="text-sm text-gray-500">
              A healthy and educational <br /> platform for a better life.
            </p>            
          </div>         

          {/* Navigation */}
          <div className="space-y-1">
            <h4 className="font-semibold text-lg text-[#196D0D]">Navigation</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><a href="/" className="hover:text-green-600 transition-colors">Home</a></li>              
              <li><a href="/tracker" className="hover:text-green-600 transition-colors">Tracker</a></li>
              <li><a href="/education" className="hover:text-green-600 transition-colors">Education</a></li>
              <li><a href="/aboutus" className="hover:text-green-600 transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Service */}
          <div className="space-y-1">
            <h4 className="font-semibold text-lg text-[#196D0D]">Services</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><a href="/" className="hover:text-green-600 transition-colors">Tracking Food Nutrition</a></li>              
              <li><a href="/tracker" className="hover:text-green-600 transition-colors">Health Articles</a></li>
              <li><a href="/education" className="hover:text-green-600 transition-colors">FAQ</a></li>              
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-1">
            <h4 className="font-semibold text-lg text-[#196D0D]">Contact</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li><a href="mailto:InfoNutrijel@gmail.com" className="hover:text-green-600 transition-colors">InfoNutrijel@gmail.com</a></li>              
              <li><a href="tel:+6209348484" className="hover:text-green-600 transition-colors">+6209348484</a></li>
              <li className="break-words"><a href="#" className="hover:text-green-600 transition-colors">Jalan Indah Kapuk</a></li>              
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-5 text-center text-sm text-gray-500 border-t border-gray-200 mt-6">
          <p className="opacity-70">© 2025 NutriJel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;