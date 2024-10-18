import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to E-Shop</h1>
      <p className="text-xl mb-8">Discover amazing products at unbeatable prices!</p>
      <Link to="/products" className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
        Shop Now
      </Link>
    </div>
  );
};

export default Home;