'use client';
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

export default function Navbar() {
  const { cart, searchQuery, setSearchQuery } = useAppContext();  // Destructure `cart` and `searchQuery`
  const { getCartCount } = useAppContext();  // Access `getCartCount` function to get total quantity
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="w-full bg-gradient-to-r from-purple-700 via-pink-500 to-red-500 shadow-lg p-4 fixed top-0 left-0 flex items-center justify-between z-50 px-6 md:px-12">
      {/* Left: Logo */}
      <Link href="/" className="text-2xl font-bold text-white hover:text-gray-200 transition duration-200">
        My Store
      </Link>

      {/* Middle: Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center bg-white border border-gray-300 rounded-full overflow-hidden w-1/2 lg:w-1/3 shadow-md">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 px-4 outline-none text-gray-700"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-5 py-2 rounded-r-full hover:bg-yellow-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Right: Cart Icon with item count */}
      <Link href="/cart" className="relative">
        <FaShoppingCart className="text-2xl text-white hover:text-gray-200 transition duration-200" />
        {/* Display total count of items in the cart */}
        {getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
            {getCartCount()}
          </span>
        )}
      </Link>
    </nav>
  );
}
