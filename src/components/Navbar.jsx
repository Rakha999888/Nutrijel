// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GooeyNav from "./GooeyNav"; // Import komponen GooeyNav
import "../styles/index.css";

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Tracker', href: '/tracker' },
  { label: 'Education', href: '/education' },
  { label: 'About Us', href: '/aboutus' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get initial active index based on current location
  const getInitialActiveIndex = () => {
    const currentIndex = navLinks.findIndex(link => link.href === location.pathname);
    return currentIndex >= 0 ? currentIndex : 0;
  };

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
      setOpen(false);
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  }

  // Handle navigation from GooeyNav
  const handleGooeyNavigation = (href) => {
    navigate(href);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-100 via-yellow-50 to-orange-50 shadow-lg z-50 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/assets/image/logo.png" 
            alt="NutriCheck Logo" 
            className="h-10 w-10 md:h-12 md:w-12 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg" 
          />
        </Link>
        
        {/* Desktop Navigation with GooeyNav */}
        <div className="hidden md:block">
          <GooeyNav
            items={navLinks.map(link => ({
              ...link,
              onClick: () => handleGooeyNavigation(link.href)
            }))}
            particleCount={12}
            particleDistances={[70, 8]}
            particleR={80}
            initialActiveIndex={getInitialActiveIndex()}
            animationTime={500}
            timeVariance={250}
            colors={[1, 2, 3, 4]}
          />
        </div>
        
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 z-50 relative group"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setOpen(!open)}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 blur-sm"></div>
          
          {open ? (
            <svg className="w-7 h-7 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative z-10">
              <span className="block w-6 h-1 bg-green-950 mb-1 rounded transition-all"></span>
              <span className="block w-6 h-1 bg-green-950 mb-1 rounded transition-all"></span>
              <span className="block w-6 h-1 bg-green-950 rounded transition-all"></span>
            </div>
          )}
        </button>
        
        {/* Authentication Section - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <>
              <span className="text-white font-medium text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Welcome, {currentUser.displayName || currentUser.email?.split('@')[0]}
              </span>
              <button 
                onClick={handleLogout} 
                className="relative group bg-red-500 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 font-bold overflow-hidden"
              >
                <div className="absolute inset-0 bg-red-600/50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-sm"></div>
                <span className="relative z-10">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="relative group bg-white text-[#196D0D] px-5 py-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 font-bold overflow-hidden" 
              >
                <div className="absolute inset-0 bg-gray-100/50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-sm"></div>
                <span className="relative z-10">Login</span>
              </Link>
              <Link 
                to="/signup" 
                className="relative group bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-5 py-2 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 font-bold overflow-hidden" 
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/50 to-orange-500/50 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-sm"></div>
                <span className="relative z-10">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#196D0D] to-green-700 shadow-lg z-50 transition-all duration-300 ${
        open ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <ul className="flex flex-col py-4">
          {navLinks.map((link, index) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`block px-6 py-3 text-white hover:bg-white/20 transition-colors duration-200 ${
                  location.pathname === link.href ? 'bg-white/30 font-bold' : ''
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          
          {/* Mobile Authentication */}
          <div className="px-6 py-3 border-t border-white/20 mt-2">
            {currentUser ? (
              <div className="space-y-3">
                <div className="text-white/80 text-sm">
                  Welcome, {currentUser.displayName || currentUser.email?.split('@')[0]}
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full bg-red-500 text-white py-2 rounded-full shadow hover:bg-red-600 transition font-bold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link 
                  to="/login" 
                  className="block w-full bg-white text-[#196D0D] py-2 text-center rounded-full shadow hover:bg-gray-100 transition font-bold" 
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-2 text-center rounded-full shadow hover:from-yellow-500 hover:to-orange-500 transition font-bold" 
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;