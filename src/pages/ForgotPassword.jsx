import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, Toaster } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Silakan masukkan email Anda");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      
      await sendPasswordResetEmail(auth, email);
      
      toast.success(`Email reset password telah dikirim ke ${email}`, {
        duration: 8000,
        position: 'top-center',
        style: {
          background: '#4BB543',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
      });
      
      setMessage(`Instruksi reset password telah dikirim ke ${email}. Silakan periksa kotak masuk Anda.`);
      
    } catch (error) {
      console.error("Error sending reset email:", error);
      let errorMessage = "Terjadi kesalahan. Silakan coba lagi.";
      
      if (error.code === "auth/user-not-found") {
        errorMessage = "Email tidak terdaftar.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Format email tidak valid.";
      }
      
      toast.error(`❌ ${errorMessage}`, {
        duration: 5000,
        style: {
          background: '#fef2f2',
          color: '#991b1b',
          borderLeft: '4px solid #ef4444',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <Toaster position="top-center" />
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="fixed md:absolute top-4 left-4 md:top-6 md:left-6 flex items-center text-[#196D0D] hover:text-[#0f4a0a] transition-colors z-10 bg-white bg-opacity-80 backdrop-blur-sm rounded-full p-2 shadow-md"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 19l-7-7 7-7" 
          />
        </svg>
      </button>
      
      {/* Left Side - Illustration */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-[#A8D5AA] to-[#7CB083] flex flex-col items-center justify-center p-8 py-16 md:py-8">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Lupa Password?</h1>
          
          {/* Illustration */}
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <svg 
              className="w-64 h-64 mx-auto" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" 
                stroke="#1F2937" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-gray-800 text-lg">
            Jangan khawatir! Kami akan mengirimkan petunjuk untuk mengatur ulang password Anda.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 py-12 md:py-8 bg-white relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Atur Ulang Password</h2>
            <p className="text-gray-600">Masukkan email yang terdaftar untuk menerima tautan reset password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg 
                    className="h-5 w-5 text-gray-400" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-700 placeholder-gray-400"
                  placeholder="contoh@email.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-4 px-6 border border-transparent rounded-xl font-medium text-white ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-green-200'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:-translate-y-0.5`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mengirim...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Kirim Tautan Reset
                  </>
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Ingat password Anda?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-green-600 hover:text-green-500 transition-colors"
                >
                  Masuk disini
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-xs text-center text-gray-500">
              {new Date().getFullYear()} NutriJel. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
