'use client';

import { useState, useEffect, useCallback } from 'react';
import { Compass as CompassIcon, AlertTriangle } from 'lucide-react';
import { Logo } from '@/components/compass-ui/logo';
import { Compass as CompassComponent } from '@/components/compass-ui/compass';
import { VastuCard } from '@/components/compass-ui/vastu-card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LocationDisplay } from '@/components/compass-ui/location-display';
import { CalibrationTool } from '@/components/compass-ui/calibration-tool';

export default function Home() {
  const [heading, setHeading] = useState<number | null>(null);
  const [permissionState, setPermissionState] = useState<'denied' | 'granted' | 'prompt' | 'unsupported'>('prompt');
  const [isIOS, setIsIOS] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCalibrated, setIsCalibrated] = useState(true); // Assume calibrated until told otherwise

  const startCompass = useCallback(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let alpha: number | null = null;
      // For iOS Safari, webkitCompassHeading is more reliable
      if ((event as any).webkitCompassHeading) {
        alpha = (event as any).webkitCompassHeading;
      } else {
        // Standard DeviceOrientationEvent
        alpha = event.alpha;
      }

      if (alpha !== null) {
        setHeading(alpha);
        // `absolute` is true if the device provides absolute orientation data.
        setIsCalibrated(event.absolute);
        if (permissionState !== 'granted') setPermissionState('granted');
        if (error) setError(null);
      } else if (!error) {
        setError("Could not read compass data. Your device might not have a magnetometer.");
      }
    };

    // Use `deviceorientationabsolute` for better reliability on supported devices
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientationabsolute', handleOrientation, true);
    };
  }, [error, permissionState]);

  useEffect(() => {
    // Check for iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(ios);
    
    // Check if the API exists
    if (!('DeviceOrientationEvent' in window)) {
      setPermissionState('unsupported');
      setError('Device orientation is not supported by your browser.');
      return;
    }

    // On iOS 13+, we must request permission
    if (ios && typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      setPermissionState('prompt');
    } else {
      // For other devices, try to start immediately
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
    <ScrollArea className="h-screen w-full">
      <div className="flex flex-col items-center justify-between min-h-[100dvh] p-4 sm:p-6 md:p-8">
        <header className="w-full max-w-md flex items-center justify-between z-10">
          <Logo className="h-10 w-auto" />
          <LocationDisplay />
        </header>

        <main className="flex-grow flex flex-col items-center justify-center space-y-4 text-center w-full py-8">
          {permissionState !== 'granted' ? (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 rounded-lg bg-card border max-w-sm">
              <CompassIcon size={64} className="text-primary" />
              <h2 className="text-2xl font-bold">Enable Vastu Compass</h2>
              <p className="text-muted-foreground">
                To provide you with accurate Vastu directions, this app needs access to your device's motion and orientation sensors.
              </p>
              {permissionState === 'prompt' && isIOS && (
                <Button onClick={handlePermission} size="lg">
                  <CompassIcon /> Enable Compass
                </Button>
              )}
              {permissionState === 'denied' && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Permission Denied</AlertTitle>
                  <AlertDescription>
                    Please enable Motion & Orientation Access in your device's settings for this browser.
                  </AlertDescription>
                </Alert>
              )}
              {permissionState === 'unsupported' && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Not Supported</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          ) : (
            <>
              {error && (
                <Alert variant="destructive" className="max-w-md">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Compass Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!error && heading === null && (
                 <Alert className="max-w-md">
                    <CompassIcon className="h-4 w-4 animate-spin"/>
                    <AlertTitle>Calibrating...</AlertTitle>
                    <AlertDescription>Please wait while we get a lock on the compass. You may need to move your device around.</AlertDescription>
                </Alert>
              )}
              {heading !== null && (
                <>
                  <CompassComponent heading={heading} />
                  <div className="text-6xl font-bold tracking-tighter text-foreground">
                    {Math.round(heading)}°
                  </div>
                </>
              )}
            </>
          )}
        </main>

        <footer className="w-full z-10 flex flex-col items-center gap-4">
          {permissionState === 'granted' && heading !== null && (
            <>
              <VastuCard heading={heading} />
              <CalibrationTool isCalibrated={isCalibrated} />
            </>
          )}
        </footer>
      </div>
    </ScrollArea>
  );
}
