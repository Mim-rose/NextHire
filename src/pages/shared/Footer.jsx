// Footer.jsx
import React from 'react';
import { FaTwitter, FaYoutube, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-10 grid grid-cols-1 sm:grid-cols-4 gap-8 text-slate-700">

      {/* Nexthire Brand */}
      <div className="space-y-2">
        <a href="#" aria-label="Nexthire Home" className="text-2xl font-bold tracking-tight inline-block">
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Next
          </span>
          <span className="text-slate-700">Hire</span>
        </a>
        <p className="text-sm text-slate-500">
          Providing reliable tech since 2025
        </p>
      </div>

      {/* Services */}
      <div className="space-y-2">
        <h6 className="text-lg font-semibold">Services</h6>
        <ul className="space-y-1 text-sm">
          <li><a href="#" aria-label="Branding Service" className="hover:text-indigo-600 transition">Branding</a></li>
          <li><a href="#" aria-label="Design Service" className="hover:text-indigo-600 transition">Design</a></li>
          <li><a href="#" aria-label="Marketing Service" className="hover:text-indigo-600 transition">Marketing</a></li>
          <li><a href="#" aria-label="Advertisement Service" className="hover:text-indigo-600 transition">Advertisement</a></li>
        </ul>
      </div>

      {/* Company */}
      <div className="space-y-2">
        <h6 className="text-lg font-semibold">Company</h6>
        <ul className="space-y-1 text-sm">
          <li><a href="#" aria-label="About Us Page" className="hover:text-indigo-600 transition">About us</a></li>
          <li><a href="#" aria-label="Contact Page" className="hover:text-indigo-600 transition">Contact</a></li>
          <li><a href="#" aria-label="Jobs Page" className="hover:text-indigo-600 transition">Jobs</a></li>
          <li><a href="#" aria-label="Press Kit Page" className="hover:text-indigo-600 transition">Press kit</a></li>
        </ul>
      </div>

      {/* Social Icons */}
      <div className="space-y-2">
        <h6 className="text-lg font-semibold">Social</h6>
        <div className="flex gap-4 text-xl text-slate-500">
          <a href="#" aria-label="Twitter" className="hover:text-indigo-600 hover:scale-110 transition-transform">
            <FaTwitter />
          </a>
          <a href="#" aria-label="YouTube" className="hover:text-indigo-600 hover:scale-110 transition-transform">
            <FaYoutube />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-indigo-600 hover:scale-110 transition-transform">
            <FaFacebookF />
          </a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;