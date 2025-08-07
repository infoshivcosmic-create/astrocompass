
'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/compass-ui/Header';
import VastuCompass from '@/components/compass-ui/VastuCompass';
import VastuDetails from '@/components/compass-ui/VastuDetails';
import { getVastuDirection } from '@/lib/vastu';
import type { VastuDirection } from '@/lib/vastu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function Home() {
  const [heading, setHeading] = useState<number>(0);
  const [permissionState, setPermissionState] = useState<'denied' | 'granted' | 'prompt' | 'unsupported'>('prompt');
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
      // For non-iOS devices, permission is handled by the browser, so we can try to start immediately.
      startCompass();
      setPermissionState('granted');
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
    } else {
        // For non-iOS, if we are in a prompt state, it means we need to trigger it somehow.
        // A user interaction is required. We'll grant it and let the browser handle the prompt.
        startCompass();
        setPermissionState('granted');
    }
  };

  const renderContent = () => {
    if (permissionState === 'unsupported' || (permissionState === 'denied' && error)) {
      return (
        <div className="text-center mt-20 text-red-500">
          <p>{error}</p>
        </div>
      );
    }
    
    if (permissionState === 'prompt' && isIOS) {
        return (
            <AlertDialog open={true}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Permission Required</AlertDialogTitle>
                  <AlertDialogDescription>
                    This app needs access to your device's motion and orientation sensors to function as a compass. Please grant permission to continue.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handlePermission}>Grant Permission</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
    }

    return (
        <>
          <VastuCompass rotation={-heading} />
          
          <div className="text-center mt-6">
            <h1 className="text-lg font-semibold text-gray-800 mb-2">दिशा शक्ति चक्र</h1>
            <div className="text-2xl font-bold text-gray-900">{Math.round(heading)}° {currentDirection?.name}</div>
          </div>
          
          {currentDirection && <VastuDetails direction={currentDirection} />}
        </>
    )

  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 pb-6 px-4">
        {renderContent()}
      </main>
    </div>
  );
}
