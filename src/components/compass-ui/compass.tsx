'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface CompassProps {
  heading: number | null;
}

export function Compass({ heading }: CompassProps) {
  const safeHeading = heading || 0;
  const rotationStyle = {
    transform: `rotate(${-safeHeading}deg)`,
    transition: 'transform 0.5s ease-out',
  };

  const dialPoints = Array.from({ length: 12 }, (_, i) => i * 30);
  const subDialPoints = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <div className="relative w-80 h-80 sm:w-96 sm:h-96">
      {/* Outer static ring with numbers and cardinal points */}
      <div className="absolute w-full h-full" style={rotationStyle}>
        {dialPoints.map((angle) => (
          <div key={`dial-${angle}`} className="absolute w-full h-full" style={{ transform: `rotate(${angle}deg)` }}>
            <span
              className="absolute top-4 left-1/2 -translate-x-1/2 text-lg text-foreground/80"
              style={{ transform: `rotate(${-angle}deg)` }}
            >
              {[0, 90, 180, 270].includes(angle) ? '' : angle}
            </span>
          </div>
        ))}
         <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xl font-bold text-foreground" style={{ transform: `rotate(0deg)` }}>N</span>
         <span className="absolute top-1/2 right-4 -translate-y-1/2 text-xl font-bold text-foreground" style={{ transform: `rotate(-90deg)` }}>E</span>
         <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xl font-bold text-foreground" style={{ transform: `rotate(-180deg)` }}>S</span>
         <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl font-bold text-foreground" style={{ transform: `rotate(-270deg)` }}>W</span>
      </div>

       {/* Inner rotating part */}
      <div className="absolute inset-[28%] rounded-full bg-primary/20 border-4 border-primary/50 shadow-inner">
        <div className="relative w-full h-full rounded-full">
           {/* Ring with ticks */}
          <div className="absolute inset-0 rounded-full" style={rotationStyle}>
            {subDialPoints.map((angle) => (
              <div
                key={`sub-dial-${angle}`}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className={cn(
                    "absolute top-0 left-1/2 -ml-px h-2 w-px bg-primary/50",
                    angle % 15 === 0 && "h-3 w-0.5 bg-primary/80"
                  )}
                />
              </div>
            ))}
          </div>

          {/* Center Text */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div 
              className="text-4xl font-mono text-foreground"
              style={{ transform: `rotate(${-safeHeading}deg)` }}
            >
              <span style={{ transform: `rotate(${safeHeading}deg)`, display: 'inline-block' }}>
                {Math.round(safeHeading)}°
              </span>
            </div>
          </div>
           {/* Needle */}
            <div className="absolute top-1/2 left-1/2 -mt-[50%] h-1/2 w-4 -translate-x-1/2 origin-bottom" style={{ transform: `rotate(${safeHeading}deg)` }}>
              <div className="w-full h-full" style={{
                clipPath: 'polygon(50% 0, 100% 20%, 50% 100%, 0 20%)',
              }}>
                <div className="w-full h-full bg-destructive/80"></div>
              </div>
            </div>
        </div>
      </div>
       {/* Background gradient */}
      <div className="absolute inset-[25%] rounded-full bg-gradient-to-br from-primary/30 to-primary/10 opacity-50"></div>
    </div>
  );
}
