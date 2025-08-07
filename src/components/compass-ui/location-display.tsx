'use client';

import { useState, useEffect } from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function LocationDisplay() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    let isMounted = true;

    const success = (position: GeolocationPosition) => {
      if (isMounted) {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setError(null);
      }
    };

    const errorCallback = (err: GeolocationPositionError) => {
      if (isMounted) {
        setError(`Unable to retrieve location: ${err.message}`);
      }
    };

    const watchId = navigator.geolocation.watchPosition(success, errorCallback, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    });

    return () => {
      isMounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const content = () => {
    if (location) {
      return (
        <span>
          {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
        </span>
      );
    }
    if (error) {
      return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex items-center gap-1 text-destructive/80">
                        <AlertCircle className="w-4 h-4" />
                        <span>Location Error</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{error}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      );
    }
    return <span>Fetching...</span>;
  };

  return (
    <div className="flex items-center gap-2 text-sm text-foreground/80 bg-background/50 px-3 py-1.5 rounded-full border border-border/50 backdrop-blur-sm">
      <MapPin className="w-4 h-4 text-primary" />
      {content()}
    </div>
  );
}
