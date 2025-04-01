"use client";
import { useCart } from "@/app/context/CartContext"; // Import Cart Context
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [localCart, setLocalCart] = useState(cart); // Local state to handle input changes before updating global state
  
  const handleQuantityChange = (id, quantity) => {
    // Update the quantity of a product
    if (quantity < 1) return; // Prevent negative quantities
    updateQuantity(id, quantity);
    const updatedCart = localCart.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    setLocalCart(updatedCart);
  };

  const calculateTotal = () => {
    return localCart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="text-center mt-16">
          <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Product</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {localCart.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">${item.price}</td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-16 p-1 border rounded"
                    />
                  </td>
                  <td className="py-3 px-4">${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Summary */}
        <div className="mt-8 text-right">
          <h2 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h2>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-all">
            Proceed to Checkout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
