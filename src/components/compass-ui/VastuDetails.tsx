// src/components/compass-ui/VastuDetails.tsx
import React, { useState } from 'react';
import type { VastuDirection } from '@/lib/vastu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import VastuBeliefs from './VastuBeliefs';
import { fetchVastuRecommendation } from '@/app/actions';

interface VastuDetailsProps {
  direction: VastuDirection;
}

const VastuDetails: React.FC<VastuDetailsProps> = ({ direction }) => {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendation = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendation(null);
    try {
      const heading = (direction.degrees[0] + direction.degrees[1]) / 2;
      const result = await fetchVastuRecommendation({ direction: heading });
      if (result.recommendation) {
        setRecommendation(result.recommendation);
      } else {
        setError('Could not get a recommendation at this time.');
      }
    } catch (err) {
      setError('An error occurred while fetching your recommendation.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="mt-8">
      <Card className="max-w-md mx-auto" style={{borderColor: direction.colorHex, borderWidth: '2px'}}>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: direction.colorHex }}></span>
            {direction.name} ({direction.deity})
          </CardTitle>
          <CardDescription>{direction.meaning}</CardDescription>
        </CardHeader>
        <CardContent>
          <VastuBeliefs directionName={direction.name} />
          <div className="mt-6 text-center">
            <Button onClick={handleGetRecommendation} disabled={isLoading}>
                <Sparkles className="mr-2 h-4 w-4" />
                {isLoading ? 'Getting Recommendation...' : 'Personal AI Recommendation'}
            </Button>
          </div>

            {recommendation && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <h4 className="font-semibold text-gray-800">AI Vastu Guide:</h4>
                    <p className="text-sm text-gray-700 mt-2">{recommendation}</p>
                </div>
            )}
            {error && (
                <div className="mt-4 p-4 bg-red-100 rounded-lg">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VastuDetails;