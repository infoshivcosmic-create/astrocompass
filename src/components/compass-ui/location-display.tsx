'use client';

import { useState, useEffect } from 'react';
import { Compass, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
        setError(`Location Error`);
      }
    };
    const watchId = navigator.geolocation.watchPosition(success, errorCallback, { enableHighAccuracy: true });
    return () => {
      isMounted = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  const formatCoordinate = (coord: number, type: 'lat' | 'lon') => {
    const absolute = Math.abs(coord);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2);
    const direction = coord >= 0 ? (type === 'lat' ? 'N' : 'E') : (type === 'lat' ? 'S' : 'W');
    return `${degrees}°${minutes}'${seconds}"${direction}`;
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <Card className="bg-primary/10 border-primary/30 rounded-xl">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-lg font-semibold text-foreground">
            {location ? formatCoordinate(location.lat, 'lat') : error || '...'}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Compass className="w-4 h-4 text-primary" />
            <span>Latitude</span>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-primary/10 border-primary/30 rounded-xl">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
           <p className="text-lg font-semibold text-foreground">
            {location ? formatCoordinate(location.lon, 'lon') : error || '...'}
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Compass className="w-4 h-4 text-primary" />
            <span>Longitude</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
