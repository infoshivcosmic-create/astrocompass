'use server';

import { getVastuRecommendation, GetVastuRecommendationInput, GetVastuRecommendationOutput } from '@/ai/flows/get-vastu-recommendation';

export async function fetchVastuRecommendation(
  input: GetVastuRecommendationInput
): Promise<GetVastuRecommendationOutput> {
  try {
    const result = await getVastuRecommendation(input);
    return result;
  } catch (error) {
    console.error('Error fetching Vastu recommendation:', error);
    return {
      recommendation: 'Could not fetch a recommendation at this time. Please try again later.'
    };
  }
}
