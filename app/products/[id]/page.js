"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"

const ProductDetail = ({ params }) => {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]); // Placeholder for reviews
  const [ratingDistribution, setRatingDistribution] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [showAllReviews, setShowAllReviews] = useState(false); // Toggle state

  useEffect(() => {
    // Fetch the product data using the id from the URL
    axios
      .get(`https://fakestoreapi.com/products/${params.id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details:", error));

    // Example reviews data, replace with actual API if available
    const exampleReviews = [
      { rating: 5, comment: "Great product!" },
      { rating: 4, comment: "Good value for the price." },
      { rating: 5, comment: "I love this! Highly recommend." },
      { rating: 3, comment: "It's okay, but could be better." },
      { rating: 5, comment: "Fantastic, would buy again!" },
    ];
    setReviews(exampleReviews);

    // Calculate rating distribution
    const ratingCounts = exampleReviews.reduce((acc, review) => {
      acc[review.rating]++;
      return acc;
    }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

    setRatingDistribution(ratingCounts);
  }, [params.id]);



  const handleShowMoreReviews = () => {
    setShowAllReviews(!showAllReviews); // Toggle the showAllReviews state
    window.scrollTo({ top: 1000, behavior: "smooth" }); // Scroll to the review section smoothly
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 pt-16">
      <Navbar />

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto p-8 flex gap-10 items-center">
        {/* Left Section: Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section: Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <div className="flex items-center gap-3">
            <span className="text-yellow-500 text-xl">⭐⭐⭐⭐⭐</span> {/* Adjust stars based on the rating */}
            <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
          </div>

          <p className="text-2xl font-semibold text-green-500">${product.price}</p>

          <div className="mt-4">
            <h3 className="text-xl text-gray-800">Size</h3>
            <div className="flex gap-4 mt-2">
              <button className="bg-gray-300 p-3 rounded-md hover:bg-green-600 hover:text-white transition duration-300">S</button>
              <button className="bg-gray-300 p-3 rounded-md hover:bg-green-600 hover:text-white transition duration-300">M</button>
              <button className="bg-gray-300 p-3 rounded-md hover:bg-green-600 hover:text-white transition duration-300">L</button>
              <button className="bg-gray-300 p-3 rounded-md hover:bg-green-600 hover:text-white transition duration-300">XL</button>
            </div>
          </div>

          <button className="bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition duration-300 text-lg">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 flex gap-8">
        {/* Left Section: Reviews */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>

          {/* Display only top 3 reviews initially or all reviews based on the toggle state */}
          <div className="max-h-96 overflow-y-auto mb-4">
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review, index) => (
              <div
                key={index}
                className="border-b-2 border-gray-200 pb-6 mb-6 hover:shadow-lg transition-all ease-in-out duration-300"
              >
                {/* Reviewer Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src="https://via.placeholder.com/150" // Replace with actual reviewer image if available
                      alt="Reviewer"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">John Doe</h4> {/* Replace with dynamic reviewer name */}
                    <p className="text-sm text-gray-500">2 days ago</p> {/* Replace with dynamic date */}
                  </div>
                </div>

                {/* Review Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-500 text-lg">
                    {"⭐".repeat(review.rating)} {/* Show rating stars */}
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
              onClick={handleShowMoreReviews}
              className="text-green-600 font-semibold mt-4 hover:text-green-800 transition duration-300"
            >
              {showAllReviews ? "Show Less Reviews" : "Show More Reviews"}
            </button>
          )}
        </div>
      </div>
      <Footer/>

     
    </div>
  );
};

export default ProductDetail;
