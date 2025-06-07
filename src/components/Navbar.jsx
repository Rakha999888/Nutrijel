// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GooeyNav from "./GooeyNav";
import "../styles/index.css";

// SVG Icons
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);



const ChevronDown = ({ isOpen }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const navLinks = [
  { label: 'Home', href: '/home' },
  { label: 'Food', href: '/food' },
  { label: 'Tracker', href: '/tracker' },
  { label: 'Education', href: '/education' },
  { label: 'About Us', href: '/aboutus' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  // Menutup dropdown saat mengklik di luar area
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getInitialActiveIndex = () => {
    const currentPath = location.pathname;
    const currentIndex = navLinks.findIndex(link => currentPath.startsWith(link.href));
    return currentIndex >= 0 ? currentIndex : 0;
  };

  // Check if current page is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  async function handleLogout() {
    console.log('Logout dipanggil');
    try {
      await logout();
      console.log('Logout berhasil, mengarahkan ke beranda');
      navigate("/");
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
    } catch (error) {
      console.error("Gagal logout:", error);
      alert("Gagal logout. Silakan coba lagi.");
    }
  }

  // Handle navigation from GooeyNav
  const handleGooeyNavigation = (href) => {
    console.log('Navigasi ke:', href);
    navigate(href);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Handle profile navigation
  const handleProfileNavigation = (path) => {
    navigate(path);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-green-100 via-yellow-50 to-orange-50 shadow-lg z-50 font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          {/* Logo */}
          <img 
            src="/assets/image/logo.png" 
            alt="NutriCheck Logo" 
            className="h-15 w-15 md:h-20 md:w-20 object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-lg" 
          />
          
          {/* Desktop Navigation with GooeyNav */}
          <div className="hidden md:block ml-8">
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
        </div>
        
        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 z-50 relative group"
          aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 blur-sm"></div>
          
          {isMobileMenuOpen ? (
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
        <div className="hidden md:flex items-center">
          {currentUser ? (
            <div className="relative" ref={profileRef}>
              <div className="relative group">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                  }}
                  className="flex items-center gap-2 bg-white/80 hover:bg-white transition-all duration-300 rounded-full p-1 pr-3 shadow-md"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNjY1MzQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS11c2VyIj48cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDR2MiIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPjwvc3ZnPg=='; // Fallback SVG
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white">
                        <UserIcon />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-800 leading-tight">
                      {currentUser.displayName || currentUser.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-500">View profile</p>
                  </div>
                  <ChevronDown isOpen={isProfileOpen} />
                </button>
              </div>
              
              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100">
                  <div className="p-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-500">My Account</p>
                    </div>
                    <button
                      onClick={() => handleProfileNavigation('/profile')}
                      className="w-full text-left flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg m-1 group"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">My Profile</p>
                        <p className="text-xs text-gray-500">Manage your profile</p>
                      </div>
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors rounded-lg m-1 group"
                    >
                      <div className="p-2 mr-3 rounded-lg bg-red-50 text-red-600 group-hover:bg-red-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Sign Out</p>
                        <p className="text-xs text-gray-500">Sign out from your account</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg z-50 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <ul className="flex flex-col py-2"> 
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={`block px-6 py-3 text-[#196D0D] hover:bg-gray-100 transition-colors duration-200 ${
                  isActive(link.href) ? 'bg-gray-100 font-bold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center">
                  <span className="flex-1">{link.label}</span>
                  {isActive(link.href) && (
                    <span className="ml-2 w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                  )}
                </div>
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
                  className="block w-full bg-[#196D0D] text-white py-2 text-center rounded-full shadow hover:bg-gray-100 transition font-bold" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-2 text-center rounded-full shadow hover:from-yellow-500 hover:to-orange-500 transition font-bold" 
                  onClick={() => setIsMobileMenuOpen(false)}
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