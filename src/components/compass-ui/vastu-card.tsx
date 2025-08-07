'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getVastuDirection } from '@/lib/vastu';
import { fetchVastuRecommendation } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

// Debounce function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


interface VastuCardProps {
  heading: number | null;
}

export function VastuCard({ heading }: VastuCardProps) {
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const vastuInfo = useMemo(() => {
    if (heading === null) return null;
    return getVastuDirection(heading);
  }, [heading]);

  const getAIRecommendation = useCallback(async (currentHeading: number) => {
    if (currentHeading === null) return;
    setIsLoading(true);
    setAiRecommendation(null);
    try {
      const result = await fetchVastuRecommendation({ direction: Math.round(currentHeading) });
      setAiRecommendation(result.recommendation);
    } catch (error) {
      console.error(error);
      setAiRecommendation('Failed to load AI recommendation.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetAIRecommendation = useMemo(() => debounce(getAIRecommendation, 1000), [getAIRecommendation]);

  useEffect(() => {
    if (heading !== null) {
      debouncedGetAIRecommendation(heading);
    }
  }, [heading, debouncedGetAIRecommendation]);

  if (!vastuInfo) {
    return (
      <Card className="w-full max-w-md mx-auto mt-4 text-center">
        <CardHeader>
          <CardTitle>Vastu Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Enable the compass to see Vastu details.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-4 text-center bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground/90">{vastuInfo.name}</CardTitle>
        <CardDescription className="text-lg text-muted-foreground">{vastuInfo.meaning}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-left">
          <div>
            <p className="font-semibold text-foreground/80">Deity</p>
            <p className="text-muted-foreground">{vastuInfo.deity}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground/80">Color</p>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: vastuInfo.colorHex }}></span>
              <p className="text-muted-foreground">{vastuInfo.color}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-left mb-2 text-foreground/80">AI Guidance</h3>
          <div className="text-left p-4 rounded-lg bg-background/50 border border-input text-sm text-muted-foreground min-h-[100px]">
            {isLoading ? (
               <div className="space-y-2">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-3/4" />
               </div>
            ) : (
              aiRecommendation || 'AI is generating a recommendation for this direction...'
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
