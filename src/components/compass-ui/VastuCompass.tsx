// src/components/compass-ui/VastuCompass.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface VastuCompassProps {
  rotation: number;
}

const VastuCompass: React.FC<VastuCompassProps> = ({ rotation }) => {
  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto my-8">
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
