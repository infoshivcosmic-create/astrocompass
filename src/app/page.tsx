'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/compass-ui/Header';
import VastuCompass from '@/components/compass-ui/VastuCompass';
import VastuDetails from '@/components/compass-ui/VastuDetails';
import { getVastuDirection } from '@/lib/vastu';
import type { VastuDirection } from '@/lib/vastu';

export default function Home() {
  const [heading, setHeading] = useState<number>(0);
  const [permissionState, setPermissionState] = useState<'denied' | 'granted' | 'prompt' | 'unsupported'>('granted');
  const [isIOS, setIsIOS] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDirection, setCurrentDirection] = useState<VastuDirection | null>(null);

  const startCompass = useCallback(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let alpha: number | null = null;
      if ((event as any).webkitCompassHeading) { // For iOS
        alpha = (event as any).webkitCompassHeading;
      } else {
        alpha = event.alpha;
      }

      if (alpha !== null) {
        setHeading(alpha);
        const direction = getVastuDirection(alpha);
        setCurrentDirection(direction);
        if (permissionState !== 'granted') setPermissionState('granted');
        if (error) setError(null);
      } else if (!error) {
        setError("Could not read compass data. Your device might not have a magnetometer.");
      }
    };

    window.addEventListener('deviceorientation', handleOrientation, true);
    
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [error, permissionState]);

  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);
    
    if (!('DeviceOrientationEvent' in window)) {
      setPermissionState('unsupported');
      setError('Device orientation is not supported by your browser.');
      return;
    }

    if (ios && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      setPermissionState('prompt');
    } else {
      startCompass();
    }
  }, [startCompass]);

  const handlePermission = async () => {
    if (isIOS && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setPermissionState('granted');
          startCompass();
        } else {
          setPermissionState('denied');
          setError('Permission denied. Please enable motion and orientation access in your browser settings.');
        }
      } catch (err) {
        console.error(err);
        setPermissionState('denied');
        setError('An error occurred while requesting permission.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-6 px-4">
        {permissionState === 'granted' ? (
          <>
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-gray-800 mb-2">दिशा शक्ति चक्र</h1>
              <div className="text-2xl font-bold text-gray-900">{Math.round(heading)}° {currentDirection?.name}</div>
            </div>
            
            <VastuCompass rotation={-heading} />
            
            {currentDirection && <VastuDetails direction={currentDirection} />}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 rounded-lg bg-gray-50 border max-w-sm mx-auto mt-20">
            <h2 className="text-2xl font-bold">Enable Vastu Compass</h2>
            <p className="text-gray-500">
              To provide you with accurate Vastu directions, this app needs access to your device's motion and orientation sensors.
            </p>
            {permissionState === 'prompt' && isIOS && (
              <button onClick={handlePermission} className="px-4 py-2 bg-orange-500 text-white rounded-lg">
                Enable Compass
              </button>
            )}
            {permissionState === 'denied' && (
              <div className="text-red-500">
                <p>Permission Denied</p>
                <p className="text-sm">Please enable Motion & Orientation Access in your device's settings for this browser.</p>
              </div>
            )}
             {permissionState === 'unsupported' && (
              <div className="text-red-500">
                <p>Not Supported</p>
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
