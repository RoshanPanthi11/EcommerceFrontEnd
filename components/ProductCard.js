"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
        {/* Product Image */}
        <div className="relative w-full h-56">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Product Information */}
        <div className="p-3">
          <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.title}</h2>
          <p className="text-xs text-gray-500 mt-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            {/* Price */}
            <span className="text-lg font-bold text-amber-600">${product.price}</span>
            {/* Add to Cart Button */}
            <button className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
