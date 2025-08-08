'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getVastuDirection } from '@/lib/vastu';
import type { VastuDirection } from '@/lib/vastu';

export const useVastu = () => {
  const [heading, setHeading] = useState<number>(0);
  const [permissionState, setPermissionState] = useState<'denied' | 'granted' | 'unsupported'>('granted');
  const [isIOS, setIsIOS] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDirection, setCurrentDirection] = useState<VastuDirection | null>(null);
  
  const orientationListenerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(null);

  const stopCompass = useCallback(() => {
    if (orientationListenerRef.current) {
      window.removeEventListener('deviceorientation', orientationListenerRef.current, true);
      orientationListenerRef.current = null;
    }
  }, []);

  const startCompass = useCallback(() => {
    stopCompass(); // Ensure no multiple listeners are attached

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
    orientationListenerRef.current = handleOrientation;
  }, [error, permissionState, stopCompass]);

  const recalibrate = () => {
    stopCompass();
    // Short delay to allow sensors to reset
    setTimeout(() => {
        startCompass();
    }, 100);
  };


  const handlePermission = useCallback(async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
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
      startCompass();
    }
  }, [startCompass]);

  useEffect(() => {
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);
    
    if (!('DeviceOrientationEvent' in window)) {
      setPermissionState('unsupported');
      setError('Device orientation is not supported by your browser.');
      return;
    }

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // Automatically request permission
      handlePermission();
    } else {
      startCompass();
      setPermissionState('granted');
    }

    return () => {
      stopCompass();
    }
  }, [handlePermission, startCompass, stopCompass]);

  return {
    heading,
    permissionState,
    error,
    currentDirection,
    handlePermission,
    recalibrate,
  };
};
