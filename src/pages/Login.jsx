// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";
import { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      // Set flag isAuthenticated di localStorage
      localStorage.setItem("isAuthenticated", "true");
      // Hapus flag isExploring jika ada
      localStorage.removeItem("isExploring");
      navigate("/home");
    } catch (error) {
      const errorMessage = error.message === "Firebase: Error (auth/wrong-password)." || 
                         error.message === "Firebase: Error (auth/user-not-found)."
        ? "Email atau password salah. Silakan coba lagi."
        : "Terjadi kesalahan saat login. Silakan coba lagi.";
      
      setError(errorMessage);
      console.error("Login error:", error);
    }
    setLoading(false);
  }

  async function handleGoogleLogin() {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      // Set flag isAuthenticated di localStorage
      localStorage.setItem("isAuthenticated", "true");
      // Hapus flag isExploring jika ada
      localStorage.removeItem("isExploring");
      navigate("/home");
    } catch (error) {
      setError("Gagal login dengan Google. Silakan coba lagi.");
      console.error("Google login error:", error);
    }
    setLoading(false);
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Back Button */}
      <button 
        onClick={() => window.history.back()}
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
      
      {/* Left Side - Welcome Section */}
      <div className="w-full md:w-1/2 bg-[#A8D5AA] flex flex-col items-center justify-center p-8 py-16 md:py-8">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back!</h1>

          {/* Logo */}
          <div className="mb-8">
            <img src="/assets/image/logo.png" alt="NutriCheck Logo" className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4" />
          </div>

          <div className="mb-4">
            <Link to="/signup" className="bg-[#2E7D32] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#1B5E20] transition-colors inline-block text-lg shadow-md hover:shadow-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 py-12 md:py-8 bg-white relative">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h2>
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="flex items-center justify-center w-full max-w-xs mx-auto px-4 py-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <img className="w-5 h-5 mr-3" src="https://www.google.com/favicon.ico" alt="Google logo" />
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or use your email</span>
              </div>
            </div>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">👤</span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors text-lg"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors text-lg"
                  placeholder="Password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xl">
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 text-lg">
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-green-600 font-medium hover:text-green-700 hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
