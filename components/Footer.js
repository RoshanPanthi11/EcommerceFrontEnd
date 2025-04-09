"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 text-white py-8 mt-auto">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        {/* Company Name */}
        <h3 className="text-3xl font-bold tracking-wide">My Store</h3>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4">
          <a href="#" className="text-2xl hover:text-gray-200 transition duration-300">
            <FaFacebookF />
          </a>
          <a href="#" className="text-2xl hover:text-gray-200 transition duration-300">
            <FaTwitter />
          </a>
          <a href="#" className="text-2xl hover:text-gray-200 transition duration-300">
            <FaInstagram />
          </a>
          <a href="#" className="text-2xl hover:text-gray-200 transition duration-300">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Separator */}
        <div className="w-24 h-1 bg-white opacity-50 my-4"></div>

        {/* Trademark */}
        <p className="text-sm opacity-80">
          &copy; {new Date().getFullYear()} My Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
