import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { analizarSentimiento } from '../services/aiService';

// Mock data for a single product
const product = {
  id: 1,
  name: 'Sample Product',
  price: 49.99,
  description: 'This is a sample product description. It provides details about the product features and benefits.',
  image: 'https://source.unsplash.com/random/600x400?product',
  reviews: [
    { id: 1, text: 'Great product!', rating: 5 },
    { id: 2, text: 'Not bad, but could be better.', rating: 3 },
    { id: 3, text: 'Terrible experience.', rating: 1 },
  ]
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reviewSentiments, setReviewSentiments] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const analyzeSentiments = async () => {
      const sentiments: { [key: number]: string } = {};
      for (const review of product.reviews) {
        const sentiment = await analizarSentimiento(review.text);
        sentiments[review.id] = sentiment;
      }
      setReviewSentiments(sentiments);
    };

    analyzeSentiments();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2">
        <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-md" />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-2xl text-indigo-600 font-semibold mb-4">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300">
          Add to Cart
        </button>

        <h3 className="text-2xl font-bold mt-8 mb-4">Reviews</h3>
        {product.reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 bg-gray-100 rounded-md">
            <p>{review.text}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-600">Rating: {review.rating}/5</p>
              {reviewSentiments[review.id] && (
                <p className="text-sm font-semibold" style={{ color: getSentimentColor(reviewSentiments[review.id]) }}>
                  Sentiment: {reviewSentiments[review.id]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case 'POSITIVE':
      return 'green';
    case 'NEGATIVE':
      return 'red';
    case 'NEUTRAL':
      return 'gray';
    default:
      return 'black';
  }
}

export default ProductDetail;