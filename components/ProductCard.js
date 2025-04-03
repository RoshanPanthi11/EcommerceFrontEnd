"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} passHref>
      <div className="flex flex-col bg-gradient-to-b from-purple-100 via-pink-50 to-red-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer w-full h-[420px]">
        {/* Product Image */}
        <div className="relative w-full h-56">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
        </div>

        {/* Product Information */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <h2 className="text-base font-semibold text-gray-900 line-clamp-2 h-12">{product.title}</h2>
          <p className="text-xs text-gray-600 mt-2 line-clamp-2 h-12">{product.description}</p>

          <div className="flex justify-between items-center mt-auto">
            {/* Price */}
            <span className="text-lg font-bold text-pink-600">${product.price}</span>

            {/* Add to Cart Button */}
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm px-4 py-2 rounded-lg hover:opacity-90 transition-transform duration-300 transform hover:scale-105">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
