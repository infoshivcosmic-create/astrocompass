// src/components/compass-ui/VastuCompass.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VastuCompassProps {
  rotation: number;
}

const VastuCompass: React.FC<VastuCompassProps> = ({ rotation }) => {
  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mt-24 mb-8 flex items-center justify-between">
      <button className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/50 rounded-full p-2 ml-[-50px]">
        <ChevronLeft className="w-8 h-8 text-gray-700" />
      </button>
      <div className="relative w-full h-full">
        <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '-31px', marginLeft: '5px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0L24 21H0L12 0Z" fill="#FF0000"/>
          </svg>
        </div>
        <div
          className="w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <Image
            src="/images/1.PNG"
            alt="Compass Dial"
            width={400}
            height={400}
            className="rounded-full"
            data-ai-hint="compass abstract"
          />
        </div>
      </div>
      <button className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/50 rounded-full p-2 mr-[-50px]">
        <ChevronRight className="w-8 h-8 text-gray-700" />
      </button>
    </div>
  );
};

export default VastuCompass;
