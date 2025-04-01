// components/Footer.js
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-6">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center">
        {/* Company Name */}
        <h3 className="text-2xl font-bold text-Black-500">My Store</h3>

        {/* Social Media Icons */}
        <div className="flex space-x-6 mt-4">
          <a href="#" className="text-2xl text-Blue-300">
            <FaFacebookF />
          </a>
          <a href="#" className="text-2xl text-Blue-300 ">
            <FaTwitter />
          </a>
          <a href="#" className="text-2xl text-Red-300 ">
            <FaInstagram />
          </a>
          <a href="#" className="text-2xl text-Blue-300 ">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Trademark */}
        <div className="mt-6 text-sm text-Black-400">
          <p>&copy; {new Date().getFullYear()} My Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
