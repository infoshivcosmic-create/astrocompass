'use client';

import React from 'react';
import Image from 'next/image';

interface CompassProps {
  heading: number | null;
}

export function Compass({ heading }: CompassProps) {
  const safeHeading = heading || 0;
  const rotationStyle = {
    transform: `rotate(${-safeHeading}deg)`,
    transition: 'transform 0.5s ease-out',
  };

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96">
      <div style={rotationStyle}>
        <Image
          src="https://placehold.co/400x400.png"
          alt="Compass"
          width={400}
          height={400}
          className="rounded-full"
          data-ai-hint="compass abstract"
        />
      </div>
    </div>
  );
}
