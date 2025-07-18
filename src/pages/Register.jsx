// src/pages/Register.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/index.css";
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";

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
      
      // Tampilkan notifikasi sukses
      toast.success('Pendaftaran berhasil! Selamat datang di Nutrijel!', {
        duration: 5000,
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
      
      // Beri jeda sebelum navigasi agar notifikasi terlihat
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      const errorMessage = error.message || "Gagal membuat akun. Silakan coba lagi.";
      setError(errorMessage);
      // Tampilkan notifikasi error
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#ff4d4f',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
      });
      console.error("Signup error:", error);
    }

    setLoading(false);
  }

  async function handleGoogleSignup() {
    try {
      setError("");
      setLoading(true);
      await loginWithGoogle();
      // Set flag isAuthenticated di localStorage
      localStorage.setItem("isAuthenticated", "true");
      // Hapus flag isExploring jika ada
      localStorage.removeItem("isExploring");
      
      // Tampilkan notifikasi sukses
      toast.success('Berhasil masuk dengan Google! Selamat datang di Nutrijel!', {
        duration: 5000,
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
      
      // Beri jeda sebelum navigasi agar notifikasi terlihat
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      const errorMessage = error.message || "Gagal masuk dengan Google. Silakan coba lagi.";
      setError(errorMessage);
      // Tampilkan notifikasi error
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#ff4d4f',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }
      });
      console.error("Google signup error:", error);
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
                  placeholder="Konfirmasi Password"
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none text-xl"
                  aria-label={showConfirmPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showConfirmPassword ? "👁️" : "🙈"}
                </button>
              </div>
              
              <Link 
                to="/forgot-password" 
                className="text-green-600 hover:underline text-sm"
              >
                Forgot password?
              </Link>
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
      <div className="w-full md:w-1/2 bg-[#A8D5AA] flex flex-col items-center justify-center p-8 py-16 md:py-8 overflow-hidden">
        <div className="text-center max-w-md mx-auto">
          <AnimatePresence>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3
                }
              }}
              className="text-4xl font-bold text-gray-800 mb-6"
            >
              Start New Journey!
              <motion.span 
                className="block h-1.5 bg-gradient-to-r from-green-600 to-emerald-400 rounded-full mt-2"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ 
                  scaleX: 1, 
                  opacity: 1,
                  transition: { 
                    delay: 0.8,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              />
            </motion.h1>

            {/* Logo */}
            <motion.div 
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { 
                  delay: 0.5,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }
              }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <motion.img 
                src="/assets/image/logo.png" 
                alt="NutriCheck Logo" 
                className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
            >
              <Link 
                to="/login" 
                className="relative overflow-hidden group bg-[#2E7D32] text-white px-12 py-3 rounded-xl font-medium hover:bg-[#1B5E20] transition-all duration-300 inline-block text-lg shadow-md hover:shadow-lg"
              >
                <span className="relative z-10">Sign In</span>
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </div>
    </>
  );
};

export default SignUp;
