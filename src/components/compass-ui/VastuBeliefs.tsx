// src/components/compass-ui/VastuBeliefs.tsx
import React from 'react';

interface VastuBeliefsProps {
    directionName: string;
}

const beliefs: Record<string, string> = {
    'North': 'Considered auspicious for financial matters. Good for placing lockers or safes.',
    'North-North-East': 'This direction is associated with health and healing.',
    'North-East': 'Ideal for meditation, prayer, or a study. It is the direction of clarity and wisdom.',
    'East-North-East': 'A good direction for entertainment and recreation areas.',
    'East': 'Best for the main entrance of a house to welcome positive energy and prosperity.',
    'East-South-East': 'Related to analysis and decision making. Good for a home office.',
    'South-East': 'The direction of fire. Ideal for kitchens.',
    'South-South-East': 'Represents power and confidence. Good for a gym or a place for physical activity.',
    'South': 'Favorable for placing heavy furniture. It brings stability.',
    'South-South-West': 'The direction of expenditure and disposal. Good for placing toilets or dustbins.',
    'South-West': 'Direction for the master bedroom. It provides stability and strength to relationships.',
    'West-South-West': 'Good for education and savings. Ideal for children\'s study room.',
    'West': 'Brings gains and profits. Good for a dining room.',
    'West-North-West': 'Related to detox and cleansing. Can be used for storage.',
    'North-West': 'Associated with support and banking. Good for a guest room.',
    'North-North-West': 'Direction of attraction and sex. Can be a location for a bedroom.'
};

const VastuBeliefs: React.FC<VastuBeliefsProps> = ({ directionName }) => {
    const belief = beliefs[directionName] || "No specific belief information for this direction.";
  return (
    <div>
        <h4 className="font-semibold mb-2">Vastu Beliefs:</h4>
        <p className="text-sm text-gray-700">{belief}</p>
    </div>
  );
};

export default VastuBeliefs;
