import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">E-Shop</Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/products" className="text-gray-600 hover:text-indigo-600">Products</Link></li>
            <li><Link to="/cart" className="text-gray-600 hover:text-indigo-600"><ShoppingCart size={20} /></Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/profile" className="text-gray-600 hover:text-indigo-600"><User size={20} /></Link></li>
                <li><button onClick={logout} className="text-gray-600 hover:text-indigo-600"><LogOut size={20} /></button></li>
              </>
            ) : (
              <li><Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;