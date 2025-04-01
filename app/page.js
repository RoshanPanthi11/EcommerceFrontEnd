"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import axios from "axios";
import Link from "next/link"; // Import the Link component for routing
import { useCart } from "@/app/context/CartContext"; // Import useCart to access cart functions

const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [flashSales, setFlashSales] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const { addToCart } = useCart(); // Get addToCart from the CartContext

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch Flash Sales products
    axios
      .get("https://fakestoreapi.com/products?limit=4")
      .then((response) => {
        setFlashSales(response.data);
      })
      .catch((error) =>
        console.error("Error fetching Flash Sales products:", error)
      );

    // Fetch Recommended products
    axios
      .get("https://fakestoreapi.com/products?limit=4")
      .then((response) => {
        setRecommended(response.data);
      })
      .catch((error) =>
        console.error("Error fetching Recommended products:", error)
      );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Banner Section */}
      <div className="relative w-full h-[500px] mt-16 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
            alt={`Slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Flash Sales Section */}
      <section className="mt-8 p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Flash Sales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashSales.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)} // Add to Cart function
            />
          ))}
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="mt-8 p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={() => addToCart(product)} // Add to Cart function
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
