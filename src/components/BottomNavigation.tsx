
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, History, Lightbulb, Droplets } from 'lucide-react';

export const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: '' },
    { path: '/registro-diario', icon: Droplets, label: '' },
    { path: '/history', icon: History, label: '' },
    { path: '/recommendations', icon: Lightbulb, label: '' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 rounded-full m-2 shadow-2xl">
        <div className="flex items-center justify-around py-3 px-0 mb-5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center space-y-1 py-3 px-6 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-water-light to-water-medium text-white transform scale-105'
                    : 'text-gray-600 hover:text-water-dark hover:bg-water-lightest'
                }`}
              >
                <item.icon className={`h-6 w-6 ${isActive ? 'text-white' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
