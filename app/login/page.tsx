"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiEndpoints } from "../config/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Create form-urlencoded body
    const formBody = new URLSearchParams();
    formBody.append('email', formData.email);
    formBody.append('password', formData.password);
    
    console.log("=== LOGIN REQUEST ===");
    console.log("URL:", apiEndpoints.login());
    console.log("Form Data:", formData);
    
    try {
      const response = await fetch(apiEndpoints.login(), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });
      
      console.log("Response Status:", response.status);
      
      const data = await response.json();
      console.log("Response Data:", data);
      
      if (response.ok && data.status === "success") {
        console.log("✅ Login successful!");
        // Simpan token atau session
        if (data.data?.token || data.token) {
          localStorage.setItem("token", data.data?.token || data.token);
        }
        // Simpan user data
        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        } else if (data.data) {
          // Fallback: save email if user object not provided
          localStorage.setItem("user", JSON.stringify({ 
            fullname: data.data.fullname || formData.email.split('@')[0],
            email: formData.email 
          }));
        }
        // Redirect ke dashboard
        window.location.href = "/";
      } else {
        const errorMsg = data.message || "Login failed";
        console.log("❌ Login failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError(`An error occurred: ${err instanceof Error ? err.message : "Please try again."}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-orange-400 to-orange-600"
      >
        <div className="absolute inset-0">
          <Image
            src="/assets/img/image 14.jpg"
            alt="Welcome to Rentverse"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center items-start px-16 text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl font-bold mb-6"
          >
            Welcome to Rentverse
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-xl leading-relaxed"
          >
            Realize your dream home. We craft spaces that are functional,<br />
            inspiring joy, tranquility, and connection.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
          <p className="text-gray-600 mb-8">Welcome back! Please sign in to continue</p>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-[#FFF5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F99933] transition text-black"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="***************************"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#FFF5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F99933] transition text-black" 
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F99933] transition"
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-4 h-4 text-[#F99933] rounded focus:ring-[#F99933]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="#" className="text-sm text-[#F99933] font-semibold hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#F99933] text-white py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Sign In"}
            </motion.button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                type="button"
                onClick={() => handleSocialLogin('google')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Google
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleSocialLogin('facebook')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                <FaFacebook className="w-5 h-5 mr-2 text-[#1877F2]" />
                Facebook
              </motion.button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#F99933] font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
