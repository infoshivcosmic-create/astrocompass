'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVastu } from '@/hooks/useVastu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const compassThemes = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
];

const CompassThemeSwitcher: React.FC<{ onNext: () => void; onPrev: () => void }> = ({ onNext, onPrev }) => (
    <div className="absolute inset-0 flex items-center justify-between z-20">
      <button
        onClick={onPrev}
        className="bg-white/50 rounded-full p-2 ml-[-50px]"
      >
        <ChevronLeft className="w-8 h-8 text-gray-700" />
      </button>
      <button
        onClick={onNext}
        className="bg-white/50 rounded-full p-2 mr-[-50px]"
      >
        <ChevronRight className="w-8 h-8 text-gray-700" />
      </button>
    </div>
  );

const Compass: React.FC<{ rotation: number; theme: string }> = ({ rotation, theme }) => (
    <div
      className="w-full h-full transition-transform duration-500 ease-in-out"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <Image
        src={theme}
        alt="Compass Dial"
        width={400}
        height={400}
        className="rounded-full"
        data-ai-hint="compass abstract"
        key={theme}
        unoptimized
      />
    </div>
  );


const CompassDetails: React.FC<{ heading: number; direction: string | undefined }> = ({ heading, direction }) => (
    <div className="text-center mt-6">
        <h1 className="text-lg font-semibold text-gray-800 mb-2">Destiny Compass</h1>
        <div className="text-2xl font-bold text-gray-900">{Math.round(heading)}° {direction}</div>
    </div>
    );

const VastuCompass: React.FC = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const { heading, permissionState, error, currentDirection, handlePermission } = useVastu();


  const handleNextTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex + 1) % compassThemes.length);
  };

  const handlePrevTheme = () => {
    setCurrentThemeIndex((prevIndex) => (prevIndex - 1 + compassThemes.length) % compassThemes.length);
  };

  const renderContent = () => {
    if (permissionState === 'unsupported' || (permissionState === 'denied' && error)) {
      return (
        <div className="text-center mt-20 text-red-500">
          <p>{error}</p>
        </div>
      );
    }
    

    return (
        <>
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 mx-auto mt-24 mb-8">
                <div className="absolute left-1/2 -translate-x-1/2 z-10" style={{ top: '-40px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0L24 21H0L12 0Z" fill="#FF0000"/>
                    </svg>
                </div>
                <Compass rotation={-heading} theme={compassThemes[currentThemeIndex]} />
                <CompassThemeSwitcher onNext={handleNextTheme} onPrev={handlePrevTheme} />
            </div>
            <CompassDetails heading={heading} direction={currentDirection?.name} />
        </>
    )
  }

  return (
    <>
        {renderContent()}
    </>
  );
};

export default VastuCompass;
