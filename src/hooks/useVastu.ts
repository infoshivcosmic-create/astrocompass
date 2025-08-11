
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { getVastuDirection } from '@/lib/vastu';
import type { VastuDirection } from '@/lib/vastu';

export const useVastu = () => {
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionState, setPermissionState] = useState<'denied' | 'granted' | 'unsupported'>('granted');
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
      
      // Prefer webkitCompassHeading for iOS as it's often more reliable
      if ((event as any).webkitCompassHeading) {
        alpha = 360 - (event as any).webkitCompassHeading;
      } 
      // For other devices, use the alpha value
      else if (event.alpha !== null) {
          alpha = event.alpha;
      }

      if (alpha !== null) {
        const newHeading = Math.round(alpha);
        setHeading(newHeading);
        const direction = getVastuDirection(newHeading);
        setCurrentDirection(direction);
        if (permissionState !== 'granted') setPermissionState('granted');
        if (error) setError(null);
      } else if (!error) {
        setError("Could not read compass data. Your device might not have a magnetometer or support absolute orientation.");
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
    // Check for the specific permission API for device orientation
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
      // If the permission API is not present, we assume permission is granted or not needed
      startCompass();
    }
  }, [startCompass]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!('DeviceOrientationEvent' in window)) {
      setPermissionState('unsupported');
      setError('Device orientation is not supported by your browser.');
      return;
    }

    // For iOS 13+ we must request permission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        // We don't call handlePermission here automatically. 
        // We let the UI prompt the user to grant permission.
        // We can set an initial state to reflect this.
        setPermissionState('denied'); // Assume denied until user action
    } else {
      startCompass();
      setPermissionState('granted');
    }

    return () => {
      stopCompass();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    heading,
    permissionState,
    error,
    currentDirection,
    handlePermission,
    recalibrate,
  };
};
