// src/components/compass-ui/Header.tsx
import React from 'react';
import { Logo } from './logo';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
             <Logo />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 text-center truncate px-2">Shiv Cosmic Energy Solutions</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
