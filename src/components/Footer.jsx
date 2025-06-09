import React from 'react';
import { MapPin, Phone, Mail, Heart, Award, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-blue-200 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-200 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-10">
          
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4 mb-6">
              <img src="/assets/image/logo.png" alt="NutriCheck" className="h-24 w-24 object-contain" />
              <div>
                <h3 className="text-2xl font-bold text-gray-900">NutriJel</h3>
                <p className="text-gray-600 leading-relaxed text-sm max-w-sm">
                  Discover how to live a healthy life, monitor your progress,
                  and learn the best nutrition for your body.
                </p>
              </div>
            </div>
            
            

          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xl text-gray-900 flex items-center">
              <span className="w-1 h-6 bg-green-500 rounded-full mr-2"></span>
              Quick Links
            </h4>
            <nav className="grid grid-cols-2 gap-1">
              <div className="space-y-1">
                {[
                  { name: 'Home', href: '/home' },
                  { name: 'Food', href: '/food' },
                  { name: 'Nutrition Tracker', href: '/tracker' }
                ].map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="block text-gray-600 hover:text-green-600 transition-all duration-200 hover:translate-x-2 text-base font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="space-y-1">
                {[
                  { name: 'Health Education', href: '/education' },
                  { name: 'About Us', href: '/aboutus' }
                ].map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="block text-gray-600 hover:text-green-600 transition-all duration-200 hover:translate-x-2 text-base font-medium"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Program Attribution */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-2 mb-8 border border-green-100">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="text-center md:text-left ml-2">
              <h5 className="font-semibold text-gray-900 mb-1">Coding Camp</h5>
              <p className="text-sm text-gray-600">Powered by DBS Foundation</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-lg px-3 border border-green-200">
                <span className="font-mono text-sm font-semibold text-green-700">CC25-CF108</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-600">
                © 2025 <span className="font-semibold">Nutrijel</span>. All rights reserved.
              </p>
              
            </div>
            
            <div className="text-sm text-gray-600 font-medium">
              A healthy and educational platform for a better life.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;