"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/context/AppContext";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductCard from "@/components/ProductCard"; // ✅ Use your existing component

export default function SearchResults() {
  const { searchQuery } = useAppContext();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = searchParams.get("query") || searchQuery;
    if (!query) return;

    setLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const filteredProducts = res.data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, [searchParams, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchParams.get("query")}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
