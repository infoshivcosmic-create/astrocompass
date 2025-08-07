// src/components/compass-ui/VastuCompass.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VastuCompassProps {
  rotation: number;
}

const compassThemes = [
  '/images/1.PNG',
  '/images/2.PNG',
  '/images/3.PNG',
  '/images/4.PNG',
];

const VastuCompass: React.FC<VastuCompassProps> = ({ rotation }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const handleNextTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % compassThemes.length);
  };

  const handlePrevTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex - 1 + compassThemes.length) % compassThemes.length);
  };

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mt-24 mb-8 flex items-center justify-between">
      <button
        onClick={handlePrevTheme}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/50 rounded-full p-2 ml-[-50px]"
      >
        <ChevronLeft className="w-8 h-8 text-gray-700" />
      </button>
      <div className="relative w-full h-full">
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '-40px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L24 21H0L12 0Z" fill="#FF0000"/>
          </svg>
        </div>
        <div
          className="w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <Image
            src={compassThemes[currentThemeIndex]}
            alt="Compass Dial"
            width={400}
            height={400}
            className="rounded-full"
            data-ai-hint="compass abstract"
            key={currentThemeIndex}
            unoptimized
          />
        </div>
      </div>
      <button
        onClick={handleNextTheme}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/50 rounded-full p-2 mr-[-50px]"
      >
        <ChevronRight className="w-8 h-8 text-gray-700" />
      </button>
    </div>
  );
};

export default VastuCompass;
