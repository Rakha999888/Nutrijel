import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLayout } from '../context/LayoutContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { setShowHeaderFooter } = useLayout();

  // Pastikan header/footer disembunyikan saat komponen ini dimuat
  useEffect(() => {
    setShowHeaderFooter(false);
    
    // Bersihkan efek saat komponen di-unmount
    return () => {
      setShowHeaderFooter(true);
    };
  }, [setShowHeaderFooter]);

  const handleExplore = () => {
    // Set flag di localStorage untuk menandai user hanya ingin menjelajah
    localStorage.setItem('isExploring', 'true');
    setShowHeaderFooter(false); // Pastikan header/footer tetap tersembunyi
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/assets/image/logo.png" 
            alt="NutriCheck Logo" 
            className="w-32 h-32 md:w-40 md:h-40 mx-auto"
          />
        </div>

        {/* Judul dan Deskripsi */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Complete platform for tracking your daily food and diet
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our modern food and diet tracking features. Choose one to get started!
        </p>

        {/* Tombol Pilihan */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button
            onClick={handleExplore}
            className="w-full md:w-auto bg-white border-2 border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 px-8 py-4 rounded-xl font-medium text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Explore Features
          </button>
          
          <Link 
            to="/login"
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-medium text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Start Tracking
          </Link>
        </div>

        {/* Teks Kecil di Bawah */}
        <p className="mt-8 text-gray-500 text-sm">
          By selecting "Start Tracking", you agree to our terms of service
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
