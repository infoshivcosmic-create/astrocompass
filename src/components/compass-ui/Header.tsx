// src/components/compass-ui/Header.tsx
import React from 'react';
import { Logo } from './logo';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
             <Logo />
          </div>
          <h1 className="text-xl font-bold text-gray-800">Shiv Cosmic Energy Solutions</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
