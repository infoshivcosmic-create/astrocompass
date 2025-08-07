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
       {/* Red needle pointing up */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10" style={{'height': '50%'}}>
        <svg width="20" height="100%" viewBox="0 0 20 160">
            <polygon points="10,0 20,20 10,160 0,20" fill="#E53E3E"/>
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
