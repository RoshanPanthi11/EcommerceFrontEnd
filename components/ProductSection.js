"use client";
import ProductCard from "./ProductCard";

export default function ProductSection({ title, products }) {
  return (
    <div className="w-full max-w-6xl my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
