// src/ai/flows/get-vastu-recommendation.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow to provide Vastu recommendations based on compass direction.
 *
 * - getVastuRecommendation - A function that takes a direction (in degrees) and returns personalized Vastu recommendations.
 * - GetVastuRecommendationInput - The input type for the getVastuRecommendation function.
 * - GetVastuRecommendationOutput - The return type for the getVastuRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetVastuRecommendationInputSchema = z.object({
  direction: z.number().describe('The compass direction in degrees (0-360).'),
});
export type GetVastuRecommendationInput = z.infer<typeof GetVastuRecommendationInputSchema>;

const GetVastuRecommendationOutputSchema = z.object({
  recommendation: z.string().describe('Personalized Vastu recommendation for the given direction.'),
});
export type GetVastuRecommendationOutput = z.infer<typeof GetVastuRecommendationOutputSchema>;

export async function getVastuRecommendation(input: GetVastuRecommendationInput): Promise<GetVastuRecommendationOutput> {
  return getVastuRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getVastuRecommendationPrompt',
  input: {schema: GetVastuRecommendationInputSchema},
  output: {schema: GetVastuRecommendationOutputSchema},
  prompt: `You are an expert in Vastu Shastra. A user is facing a particular direction. Provide a concise and actionable Vastu recommendation based on the direction they are facing (in degrees).

Direction: {{{direction}}} degrees.

Consider these Vastu principles when formulating your recommendation:

*   North (0 degrees): Ruled by Kubera, god of wealth. Auspicious for entrances and business activities.
*   Northeast (45 degrees): Governed by Ishana. Ideal for meditation rooms and prayer spaces.
*   East (90 degrees): Controlled by Indra, the king of gods. Good for main entrances and promoting social connections.
*   Southeast (135 degrees): Ruled by Agni, the god of fire. Suitable for kitchens and energy-related activities.
*   South (180 degrees): Governed by Yama, the god of death. Can be challenging, but beneficial for stability and strength.
*   Southwest (225 degrees): Controlled by Nirriti. Requires careful management to avoid negative energies.
*   West (270 degrees): Ruled by Varuna, the god of water. Good for dining rooms and promoting financial prosperity.
*   Northwest (315 degrees): Governed by Vayu, the god of wind. Suitable for guest rooms and promoting travel opportunities.

Address the user directly in your response.`, 
});

const getVastuRecommendationFlow = ai.defineFlow(
  {
    name: 'getVastuRecommendationFlow',
    inputSchema: GetVastuRecommendationInputSchema,
    outputSchema: GetVastuRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
