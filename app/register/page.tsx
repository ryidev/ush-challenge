"use client";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiEndpoints } from "../config/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    role: "tenant",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    
    // Create form-urlencoded body
    const formBody = new URLSearchParams();
    formBody.append('email', formData.email);
    formBody.append('password', formData.password);
    formBody.append('fullname', formData.fullname);
    formBody.append('role', formData.role);
    
    console.log("=== REGISTER REQUEST ===");
    console.log("URL:", apiEndpoints.register());
    console.log("Form Data:", formData);
    
    try {
      const response = await fetch(apiEndpoints.register(), {
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
        console.log("✅ Registration successful!");
        // Simpan token jika ada
        if (data.data?.token || data.token) {
          localStorage.setItem("token", data.data?.token || data.token);
        }
        // Simpan user data
        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        } else {
          // Save from form data
          localStorage.setItem("user", JSON.stringify({ 
            fullname: formData.fullname,
            email: formData.email,
            role: formData.role
          }));
        }
        // Redirect ke home
        window.location.href = "/";
      } else {
        const errorMsg = data.message || "Registration failed";
        console.log("❌ Registration failed:", errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError(`An error occurred: ${err instanceof Error ? err.message : "Please try again."}`);
    } finally {
      setIsLoading(false);
    }
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

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Register Now</h2>
          
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
            {/* Fullname */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fullname
              </label>
              <input
                type="text"
                value={formData.fullname}
                onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                placeholder="budiono siregar"
                className="w-full px-4 py-3 rounded-lg bg-[#FFF5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F99933] transition text-black"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="budiono siregar@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-[#FFF5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F99933] transition text-black"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Role
              </label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-between px-4 py-3 rounded-lg bg-[#FFF5ED] border border-gray-200 cursor-pointer hover:border-[#F99933] transition">
                  <span className="text-gray-700">Tenant</span>
                  <input
                    type="radio"
                    name="role"
                    value="tenant"
                    checked={formData.role === "tenant"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-5 h-5 text-[#F99933] focus:ring-[#F99933]"
                  />
                </label>
                <label className="flex-1 flex items-center justify-between px-4 py-3 rounded-lg bg-[#FFF5ED] border border-gray-200 cursor-pointer hover:border-[#F99933] transition">
                  <span className="text-gray-700">Property Owner</span>
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={formData.role === "owner"}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-5 h-5 text-[#F99933] focus:ring-[#F99933]"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                *Choose this if you are looking to search for and book an apartment
              </p>
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-[#F99933] transition text-black"
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="***************************"
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-[#FFF5ED] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F99933] transition text-black"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-[#F99933] transition"
                >
                  {showConfirmPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-5 h-5 mt-0.5 text-[#F99933] rounded focus:ring-[#F99933]"
                required
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                By registering, I agree to{" "}
                <Link href="#" className="text-[#F99933] font-semibold hover:underline">
                  Rentverse Terms & Conditions and Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#F99933] text-white py-3 rounded-lg font-semibold hover:bg-orange-400 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Next"}
            </motion.button>

            {/* Sign In Link */}
            <p className="text-center text-sm text-gray-600">
              Already have a Rentverse account?{" "}
              <Link href="/login" className="text-[#F99933] font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
