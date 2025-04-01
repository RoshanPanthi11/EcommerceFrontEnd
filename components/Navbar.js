import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md p-4 fixed top-0 left-0 flex items-center justify-between z-50 px-6 md:px-12">
      {/* Left: Logo */}
      <Link href="/" className="text-xl font-bold text-amber-600">
        My Store
      </Link>

      {/* Middle: Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 outline-none"
        />
        <button className="bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 transition duration-200">
          Search
        </button>
      </div>

      {/* Right: Cart Icon */}
      <Link href="/cart" className="text-gray-600 hover:text-blue-600 text-2xl">
        <FaShoppingCart />
      </Link>
    </nav>
  );
}
