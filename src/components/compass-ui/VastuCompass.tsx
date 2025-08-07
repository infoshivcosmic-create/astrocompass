// src/components/compass-ui/VastuCompass.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface VastuCompassProps {
  rotation: number;
}

const VastuCompass: React.FC<VastuCompassProps> = ({ rotation }) => {
  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mt-12 mb-8">
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
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
  );
};

export default VastuCompass;
