// src/components/compass-ui/VastuDetails.tsx
import React, { useState } from 'react';
import type { VastuDirection } from '@/lib/vastu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import VastuBeliefs from './VastuBeliefs';

interface VastuDetailsProps {
  direction: VastuDirection;
}

const VastuDetails: React.FC<VastuDetailsProps> = ({ direction }) => {


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
        </CardContent>
      </Card>
    </div>
  );
};

export default VastuDetails;
