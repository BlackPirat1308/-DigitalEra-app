import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for cart items
const cartItems = [
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
];

const Cart: React.FC = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold">Total:</p>
              <p className="text-xl font-bold">${total.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Link to="/checkout" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;