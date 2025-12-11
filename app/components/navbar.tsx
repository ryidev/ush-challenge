'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/', active: true },
  { name: 'Property', href: '#property', active: false },
  { name: 'About us', href: '#about', active: false },
  { name: 'Contact', href: '#contact', active: false },
];

export default function Navbar() {
  const [user, setUser] = useState<{ fullname: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-10xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex item-center space-x-12">
            <div className="flex items-center">
            <Image 
              src="/assets/img/logo.png" 
              alt="Logo" 
              width={150} 
              height={40}
              className="h-15 w-auto"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-25 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  item.active
                    ? 'text-[#F99933] font-bold'
                    : 'text-gray-700'
                } hover:text-orange-400 transition`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="flex items-end space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-gray-900 font-semibold">{user.fullname}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[#EB5757] text-white rounded-xl hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-6 py-2 border border-[#F99933] text-[#F99933] rounded-xl hover:bg-orange-50 transition">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-6 py-2 bg-[#F99933] text-white rounded-xl hover:bg-orange-400 transition">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}