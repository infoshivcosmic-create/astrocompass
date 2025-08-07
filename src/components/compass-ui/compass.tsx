'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { directions } from '@/lib/vastu';

interface CompassProps {
  heading: number | null;
}

export function Compass({ heading }: CompassProps) {
  const rotationStyle = {
    transform: `rotate(${-(heading || 0)}deg)`,
    transition: 'transform 0.5s ease-out',
  };

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-card shadow-xl border-4 border-primary/20 flex items-center justify-center">
      <div className="absolute w-full h-full rounded-full" style={rotationStyle}>
        {/* Compass Rose with 16 directions */}
        {directions.map(({ label, angle }) => (
          <div
            key={label}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div
              className={cn(
                'absolute top-2 left-1/2 -ml-4 w-8 text-center text-xs sm:text-sm font-semibold',
                ['N', 'E', 'S', 'W'].includes(label) ? 'text-destructive font-bold text-base' : 'text-foreground/80'
              )}
              style={{ transform: `rotate(${-angle}deg)` }}
            >
              {label}
            </div>
          </div>
        ))}
        {/* Cardinal direction lines */}
        <div className="absolute top-1/2 left-1/2 w-px h-[calc(100%-2rem)] -translate-y-1/2 bg-border/50"></div>
        <div className="absolute top-1/2 left-1/2 h-px w-[calc(100%-2rem)] -translate-x-1/2 bg-border/50"></div>
        <div className="absolute top-1/2 left-1/2 w-px h-[calc(100%-4rem)] -translate-y-1/2 rotate-45 bg-border/20"></div>
        <div className="absolute top-1/2 left-1/2 h-px w-[calc(100%-4rem)] -translate-x-1/2 rotate-45 bg-border/20"></div>
      </div>
      
      {/* Needle */}
      <div className="absolute top-0 left-1/2 h-1/2 w-full flex justify-center origin-bottom">
        <svg viewBox="0 0 20 80" className="h-full w-auto" style={{filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))'}}>
           <polygon points="10,0 20,20 10,80 0,20" fill="hsl(var(--destructive))" />
        </svg>
      </div>

       {/* Center pin */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary z-10 border-2 border-background"></div>

    </div>
  );
}
