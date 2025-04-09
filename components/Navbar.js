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
    }, 300);
  };

  const categories = {
    Fashion: {
      "Men's Fashion": ["Shirts", "Pants", "Jackets", "Shoes"],
      "Women's Fashion": ["Dresses", "Tops", "Shoes", "Jewelry"],
      "Kids' Fashion": ["Boys", "Girls", "Toys", "Accessories"]
    },
    Electronics: {
      Phones: ["Smartphones", "Feature Phones", "Tablets"],
      Laptops: ["Gaming Laptops", "Ultrabooks", "MacBooks"],
      Cameras: ["DSLR", "Mirrorless", "Point-and-Shoot"]
    },
    Furniture: {
      "Living Room": ["Sofas", "Coffee Tables", "TV Units"],
      Bedroom: ["Beds", "Dressers", "Nightstands"],
      Office: ["Desks", "Chairs", "Bookshelves"]
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white shadow-md py-4 px-6 md:px-12">
      <div className="flex items-center justify-between w-full max-w-full mx-0 px-0">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold text-blue-950 hover:text-blue-600 transition duration-300"
        >
          My Store
        </Link>

        {/* Navigation Items */}
        <div className="flex items-center gap-6 relative">

          {/* Categories Mega Menu */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center text-blue-950 hover:text-blue-600 cursor-pointer font-medium">
              Categories
              <ChevronDownIcon
                className={`w-5 h-5 ml-1 transform transition-transform duration-300 ${isHovering ? "rotate-180" : "rotate-0"}`}
              />
            </div>

            {isHovering && (
              <div className="absolute left-1/2 top-full transform -translate-x-1/2 mt-4 bg-white shadow-xl rounded-xl p-6 z-50 w-[800px] grid grid-cols-3 gap-6">
                {Object.entries(categories).map(([mainCat, subCats]) => (
                  <div key={mainCat}>
                    <h3 className="font-semibold text-blue-900 mb-2 border-b pb-1">{mainCat}</h3>
                    {Object.entries(subCats).map(([subCat, items]) => (
                      <div key={subCat} className="mb-4">
                        <h4 className="text-blue-700 font-medium text-sm">{subCat}</h4>
                        <ul className="ml-2 mt-1 space-y-1">
                          {items.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                href={`/category/${mainCat}/${subCat}/${item}`}
                                className="text-blue-700 hover:text-blue-800 text-sm hover:underline"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
            className="hidden md:flex items-center border border-gray-300 rounded-full overflow-hidden w-[300px] shadow-md"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 px-4 outline-none text-blue-950 bg-transparent"
            />
            <button
              type="submit"
              className="bg-blue-950 text-white px-6 py-2 hover:bg-blue-700 transition duration-300"
            >
              Search
            </button>
          </form>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-blue-950 hover:text-blue-600 transition duration-200" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
