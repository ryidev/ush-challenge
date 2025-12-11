"use client";
import Image from "next/image";
import { useState } from "react";
import { FaInstagram, FaYoutube, FaFacebookF, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const [email, setEmail] = useState("");

  const quickLinks = [
    { name: "Property", href: "#" },
    { name: "Rent", href: "#" },
    { name: "Talk to an expert", href: "#" },
    { name: "Blog", href: "#" },
    { name: "About us", href: "#" }
  ];

  const resources = [
    { name: "Help center", href: "#" },
    { name: "Guides & Articles", href: "#" },
    { name: "Real Estate News", href: "#" },
    { name: "Market Trends", href: "#" },
    { name: "Mortgage Calculator", href: "#" }
  ];

  const socialIcons = [
    { Icon: FaInstagram, href: "#" },
    { Icon: FaYoutube, href: "#" },
    { Icon: FaFacebookF, href: "#" },
    { Icon: FaTiktok, href: "#" },
    { Icon: FaXTwitter, href: "#" }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <Image
              src="/assets/img/logo.png"
              alt="logo"
              width={150}
              height={50}
              className="brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              The trushted platform for finding your perfect home, whether you're buying, renting, or selling.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialIcons.map(({ Icon }, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F99933] transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F99933] transition-colors duration-300 inline-block hover:translate-x-2 transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div >
            <h3 className="text-xl font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#F99933] transition-colors duration-300 inline-block hover:translate-x-2 transform"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div >
            <h3 className="text-xl font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-6">
              Subcribe to our newsletter for the latest properties and real estate tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#F99933] transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-[#F99933] hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Subcribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}