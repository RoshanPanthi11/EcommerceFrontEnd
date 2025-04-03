'use client'
import { useEffect, useState } from "react";

import ProductCard from "@/components/ProductCard";

import axios from "axios";
import { useAppContext } from "@/app/context/AppContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg"];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [flashSales, setFlashSales] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [justForYou, setJustForYou] = useState([]);
  const { addToCart } = useAppContext();

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const products = res.data;
      setFlashSales(products.slice(0, 4));
      setRecommended(products.slice(5, 13));
      setJustForYou(products.sort(() => 0.5 - Math.random()).slice(0, 20));
    });
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-100">

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
        {/* Navigation Buttons */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          <FaArrowLeft size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          <FaArrowRight size={24} />
        </button>
      </div>

      {/* Flash Sales Section */}
      <section className="mt-8 p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Flash Sales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashSales.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />
          ))}
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="mt-8 p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommended.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />
          ))}
        </div>
      </section>

      {/* Just for You Section */}
      <section className="mt-8 p-4">
        <h2 className="text-2xl font-semibold text-center mb-6">Just for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {justForYou.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={() => addToCart(product)} />
          ))}
        </div>
      </section>

      
    </div>
  );
}
