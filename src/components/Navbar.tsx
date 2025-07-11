
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/registro-diario', label: 'Registro Diário' },
    { path: '/history', label: 'Histórico' },
    { path: '/recommendations', label: 'Recomendações' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-water-light to-water-medium rounded-xl">
              <Droplets className="h-6 w-6 text-water-dark" />
            </div>
            <span className="text-xl font-light text-gray-800">Hidro</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-water-dark'
                    : 'text-gray-600 hover:text-water-dark'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-water-medium to-water-dark text-white px-6 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Calcular Agora
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
