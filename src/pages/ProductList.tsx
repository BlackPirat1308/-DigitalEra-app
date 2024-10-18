import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerRecomendaciones } from '../services/aiService';
import { useAuth } from '../contexts/AuthContext';

// Mock data for products
const products = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://source.unsplash.com/random/300x300?product' },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://source.unsplash.com/random/300x300?electronics' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://source.unsplash.com/random/300x300?gadget' },
  // Add more products as needed
];

const ProductList: React.FC = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (user) {
        const userRecommendations = await obtenerRecomendaciones(user.id);
        setRecommendations(userRecommendations);
      }
    };

    fetchRecommendations();
  }, [user]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Our Products</h2>
      
      {recommendations.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Recommended for You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((productId) => {
              const product = products.find(p => p.id.toString() === productId);
              if (!product) return null;
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                    <Link to={`/product/${product.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold mb-4">All Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
              <Link to={`/product/${product.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;