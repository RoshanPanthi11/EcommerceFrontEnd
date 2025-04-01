'use client'
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppContext } from "@/app/context/AppContext"; // Import the combined context

export default function Navbar() {
  const { cart } = useAppContext(); // Access cart from context
  const { searchQuery, setSearchQuery } = useAppContext(); // Access search state from context
  const router = useRouter();

  const handleSearch = (e) => {
    
  };

  return (
    <nav className="w-full bg-white shadow-md p-4 fixed top-0 left-0 flex items-center justify-between z-50 px-6 md:px-12">
      {/* Left: Logo */}
      <Link href="/" className="text-xl font-bold text-amber-600">
        My Store
      </Link>

      {/* Middle: Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="w-full p-2 outline-none"
        />
        <button
          type="submit"
          className="bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Right: Cart Icon with item count */}
      <Link href="/cart" className="relative">
          <FaShoppingCart className="text-2xl text-gray-700" />
          
          {/* 🔴 Red Circle Badge (only if cart has items) */}
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
    </nav>
  );
}
