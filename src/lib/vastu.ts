export type VastuDirection = {
  name: string;
  degrees: [number, number];
  deity: string;
  meaning: string;
  color: string;
  colorHex: string;
};

export const vastuDirections: VastuDirection[] = [
  { name: 'North', degrees: [348.75, 11.25], deity: 'Kubera', meaning: 'Wealth & Prosperity', color: 'Green', colorHex: '#228B22' },
  { name: 'North-North-East', degrees: [11.25, 33.75], deity: 'Diti', meaning: 'Vision & Awareness', color: 'Light Blue', colorHex: '#ADD8E6' },
  { name: 'North-East', degrees: [33.75, 56.25], deity: 'Ishana', meaning: 'Clarity & Wisdom', color: 'Saffron', colorHex: '#F4C430' },
  { name: 'East-North-East', degrees: [56.25, 78.75], deity: 'Parjanya', meaning: 'Recreation & Joy', color: 'White', colorHex: '#FFFFFF' },
  { name: 'East', degrees: [78.75, 101.25], deity: 'Indra', meaning: 'Social Connections', color: 'Orange', colorHex: '#FFA500' },
  { name: 'East-South-East', degrees: [101.25, 123.75], deity: 'Agni', meaning: 'Analysis & Decision', color: 'Silver', colorHex: '#C0C0C0' },
  { name: 'South-East', degrees: [123.75, 146.25], deity: 'Shukra', meaning: 'Fire & Energy', color: 'Pink', colorHex: '#FFC0CB' },
  { name: 'South-South-East', degrees: [146.25, 168.75], deity: 'Pusha', meaning: 'Strength & Power', color: 'Red', colorHex: '#FF0000' },
  { name: 'South', degrees: [168.75, 191.25], deity: 'Yama', meaning: 'Relaxation & Fame', color: 'Crimson', colorHex: '#DC143C' },
  { name: 'South-South-West', degrees: [191.25, 213.75], deity: 'Gandharva', meaning: 'Disposal & Expenditure', color: 'Yellow', colorHex: '#FFFF00' },
  { name: 'South-West', degrees: [213.75, 236.25], deity: 'Nirriti', meaning: 'Skills & Relationships', color: 'Brown', colorHex: '#A52A2A' },
  { name: 'West-South-West', degrees: [236.25, 258.75], deity: 'Sugriva', meaning: 'Education & Savings', color: 'Blue', colorHex: '#0000FF' },
  { name: 'West', degrees: [258.75, 281.25], deity: 'Varuna', meaning: 'Gains & Profits', color: 'Dark Blue', colorHex: '#00008B' },
  { name: 'West-North-West', degrees: [281.25, 303.75], deity: 'Vayu', meaning: 'Depression & Detox', color: 'Grey', colorHex: '#808080' },
  { name: 'North-West', degrees: [303.75, 326.25], deity: 'Roga', meaning: 'Support & Banking', color: 'White', colorHex: '#FFFFFF' },
  { name: 'North-North-West', degrees: [326.25, 348.75], deity: 'Mukhya', meaning: 'Attraction & Sex', color: 'Cream', colorHex: '#FFFDD0' },
];

export const getVastuDirection = (heading: number): VastuDirection => {
  // Handle the North crossover (348.75 to 11.25)
  if (heading >= 348.75 || heading < 11.25) {
    return vastuDirections[0];
  }

  const direction = vastuDirections.find(dir => {
    return heading >= dir.degrees[0] && heading < dir.degrees[1];
  });

  return direction || vastuDirections[0]; // Default to North
};

export const directions = [
  { label: 'N', angle: 0 },
  { label: 'NNE', angle: 22.5 },
  { label: 'NE', angle: 45 },
  { label: 'ENE', angle: 67.5 },
  { label: 'E', angle: 90 },
  { label: 'ESE', angle: 112.5 },
  { label: 'SE', angle: 135 },
  { label: 'SSE', angle: 157.5 },
  { label: 'S', angle: 180 },
  { label: 'SSW', angle: 202.5 },
  { label: 'SW', angle: 225 },
  { label: 'WSW', angle: 247.5 },
  { label: 'W', angle: 270 },
  { label: 'WNW', angle: 292.5 },
  { label: 'NW', angle: 315 },
  { label: 'NNW', angle: 337.5 },
];
