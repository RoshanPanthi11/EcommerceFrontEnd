"use client";

import { useAppContext } from "@/app/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useAppContext();

  // Handle quantity change
  const handleQuantityChange = (id, action) => {
    updateQuantity(id, action);
  };

  // Calculate the total price
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-16">
      <Navbar />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border">
                {/* Image */}
                <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />

                {/* Product Info */}
                <div className="flex-1 ml-4">
                  <p className="text-gray-800 font-medium text-lg">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                {/* Price */}
                <div className="text-sm font-semibold text-green-600">${(item.price * item.quantity).toFixed(2)}</div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 text-xl"
                >
                  <FaTrashAlt />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Cart Summary */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h2>
          <div className="flex justify-between text-lg">
            <span className="text-gray-600">Total Items:</span>
            <span>{cart.reduce((total, item) => total + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-lg mt-2">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-green-600">${getTotal()}</span>
          </div>

          <div className="flex justify-between mt-4">
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
            >
              Clear Cart
            </button>

            {/* Checkout Button */}
            <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
