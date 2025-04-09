'use client';
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/context/AppContext";

export default function Navbar() {
  const { cart, searchQuery, setSearchQuery, getCartCount } = useAppContext();
  const router = useRouter();

  const [isHovering, setIsHovering] = useState(false);
  let timer;

  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsHovering(false);
    }, 300); // stays open for 300ms
  };

  const categories = {
    "Fashion": {
      "Men's Fashion": ["Shirts", "Pants", "Jackets", "Shoes"],
      "Women's Fashion": ["Dresses", "Tops", "Shoes", "Jewelry"],
      "Kids' Fashion": ["Boys", "Girls", "Toys", "Accessories"]
    },
    "Electronics": {
      "Phones": ["Smartphones", "Feature Phones", "Tablets"],
      "Laptops": ["Gaming Laptops", "Ultrabooks", "MacBooks"],
      "Cameras": ["DSLR", "Mirrorless", "Point-and-Shoot"]
    },
    "Furniture": {
      "Living Room": ["Sofas", "Coffee Tables", "TV Units"],
      "Bedroom": ["Beds", "Dressers", "Nightstands"],
      "Office": ["Desks", "Chairs", "Bookshelves"]
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 p-4 px-6 md:px-12 z-50 backdrop-blur-md bg-gradient-to-r from-purple-700/50 via-pink-500/50 to-red-500/50 rounded-b-xl shadow-md flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      
      {/* Logo */}
      <Link
        href="/"
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white hover:opacity-80 transition duration-300"
      >
        My Store
      </Link>

      {/* Categories Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex items-center gap-2 bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 text-white px-4 py-2 rounded-xl shadow-md hover:from-purple-600 hover:to-pink-500 transition-all duration-300 ease-in-out">
          Categories
          <ChevronDownIcon
            className={`w-5 h-5 transform transition duration-300 ${isHovering ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>

        {isHovering && (
          <div className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 w-64 z-50">
            {Object.entries(categories).map(([mainCat, subCats]) => (
              <div key={mainCat} className="relative group/category">
                <div className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">
                  {mainCat}
                </div>

                <div className="absolute left-full top-0 hidden group-hover/category:flex flex-col bg-white shadow-lg rounded-md w-56 z-50">
                  {Object.entries(subCats).map(([subCat, items]) => (
                    <div key={subCat} className="relative group/sub">
                      <div className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                        {subCat}
                      </div>
                      <div className="absolute left-full top-0 hidden group-hover/sub:flex flex-col bg-white shadow-lg rounded-md w-56 z-50">
                        {items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/category/${mainCat}/${subCat}/${item}`}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (searchQuery.trim()) {
            router.push(`/search?q=${searchQuery}`);
          }
        }}
        className="flex items-center bg-white/90 border border-gray-300 rounded-full overflow-hidden w-full md:w-1/2 lg:w-1/3 shadow-md"
      >
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 px-4 outline-none text-gray-700 bg-transparent"
        />
        <button
          type="submit"
          className="bg-yellow-500 text-white px-5 py-2 rounded-r-full hover:bg-yellow-600 transition duration-300"
        >
          Search
        </button>
      </form>

      {/* Cart Icon */}
      <Link href="/cart" className="relative">
        <FaShoppingCart className="text-2xl text-white hover:text-yellow-200 transition duration-200" />
        {getCartCount() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
            {getCartCount()}
          </span>
        )}
      </Link>
    </nav>
  );
}
