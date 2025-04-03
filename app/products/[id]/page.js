"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "@/app/context/AppContext"; // ✅ Corrected Context Import
import { useParams } from "next/navigation"; // ✅ Correct for Next.js 15

const ProductDetail = () => {
  const { id } = useParams(); // ✅ Extract product ID from the URL
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const { addToCart } = useAppContext(); // ✅ Corrected Context Hook

  useEffect(() => {
    if (!id) return;

    // Fetch Product Details
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));

    // Simulated Reviews (Replace with API if available)
    const exampleReviews = [
      { rating: 5, comment: "Great product!" },
      { rating: 4, comment: "Good value for the price." },
      { rating: 5, comment: "I love this! Highly recommend." },
      { rating: 3, comment: "It's okay, but could be better." },
      { rating: 5, comment: "Fantastic, would buy again!" },
    ];
    setReviews(exampleReviews);
  }, [id]);

  if (!product) return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;

  return (
    <div className="bg-gray-50 pt-16">
     

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto p-8 flex gap-12 items-center">
        {/* Left Section: Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Section: Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

          {/* Product Rating */}
          <div className="flex items-center gap-3 text-xl">
            <span className="text-yellow-500">
              {"⭐".repeat(Math.round(product.rating?.rate || 0))}
            </span>
            <span className="text-gray-600 text-sm">({product.rating?.count || 0} reviews)</span>
          </div>

          <p className="text-2xl font-semibold text-green-600">${product.price}</p>

          {/* Size Selection */}
          <div className="mt-6">
            <h3 className="text-xl text-gray-800">Select Size</h3>
            <div className="flex gap-4 mt-3">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className="bg-gray-300 p-3 rounded-md hover:bg-green-600 hover:text-white transition duration-300 transform hover:scale-105"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-green-500 to-teal-400 text-white py-3 rounded-lg mt-8 hover:bg-teal-500 transition duration-300 text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>

          {/* Show Reviews */}
          <div className="max-h-96 overflow-y-auto mb-4">
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review, index) => (
              <div key={index} className="border-b-2 border-gray-200 pb-6 mb-6">
                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src="https://via.placeholder.com/150" // Replace with actual reviewer image
                      alt="Reviewer"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">John Doe</h4>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>

                {/* Review Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500 text-lg">
                    {"⭐".repeat(review.rating)}
                  </span>
                  <span className="text-gray-500 text-sm">({review.rating} stars)</span>
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 text-base">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Show More Reviews Button */}
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-green-600 font-semibold mt-4 hover:text-green-800 transition duration-300"
            >
              {showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
            </button>
          )}
        </div>
      </div>

  
    </div>
  );
};

export default ProductDetail;
