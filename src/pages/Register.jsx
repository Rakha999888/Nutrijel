// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setError("");
      setLoading(true);
      await signup(formData.email, formData.password, formData.displayName);
      // Set flag isAuthenticated di localStorage
      localStorage.setItem("isAuthenticated", "true");
      // Hapus flag isExploring jika ada
      localStorage.removeItem("isExploring");
      navigate("/home");
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Signup error:", error);
    }

    setLoading(false);
  }

  async function handleGoogleSignup() {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      setError("Failed to sign up with Google. Please try again.");
      console.error("Google signup error:", error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Sign Up Form */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 py-16 md:py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Account</h2>
            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleGoogleSignup}
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
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors text-lg"
                  placeholder="Name"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">✉️</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors text-lg"
                  placeholder="Password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xl">
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔒</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors text-lg"
                  placeholder="Confirm Password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xl">
                  {showConfirmPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 text-base mb-2">Forgot your password?</p>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white py-4 px-6 rounded-xl font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 text-lg">
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-lg">
              Already have an account?{" "}
              <Link to="/login" className="text-orange-500 hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Welcome Section */}
      <div className="w-full md:w-1/2 bg-[#A8D5AA] flex flex-col items-center justify-center p-8 py-16 md:py-8">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Start New Journey!</h1>
          <p className="text-gray-700 text-lg mb-8">Already have an account?</p>

          {/* Logo */}
          <div className="mb-8">
            <img src="/assets/image/logo.png" alt="NutriCheck Logo" className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6" />
          </div>

          <div className="mb-4">
            <Link to="/login" className="bg-[#2E7D32] text-white px-12 py-3 rounded-xl font-medium hover:bg-[#1B5E20] transition-colors inline-block text-lg shadow-md hover:shadow-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
