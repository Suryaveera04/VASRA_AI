export interface SyntheticIntent {
  id: number;
  query: string;
  expectedCategory?: string;
  expectedFabric?: string;
  expectedColor?: string;
  expectedOccasion?: string;
  expectedMaxPrice?: number;
}

export const syntheticEvaluationDataset: SyntheticIntent[] = [
  { id: 1, query: 'Show me a traditional red silk saree for a wedding under ₹10,000', expectedColor: 'red', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 2, query: 'Red silk wedding saree below 10000', expectedColor: 'red', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 3, query: 'Imperial navy banarasi brocade for evening reception', expectedColor: 'blue', expectedFabric: 'banarasi', expectedOccasion: 'reception' },
  { id: 4, query: 'Green traditional saree below 7000', expectedColor: 'green', expectedMaxPrice: 7000 },
  { id: 5, query: 'Emerald temple border kuttu silk saree for pooja', expectedColor: 'green', expectedFabric: 'kuttu', expectedOccasion: 'festival' },
  { id: 6, query: 'Rose gold tissue silk saree for cocktail party under 8000', expectedColor: 'gold', expectedFabric: 'tissue', expectedOccasion: 'reception', expectedMaxPrice: 8000 },
  { id: 7, query: 'Burgundy bridal silk saree with antique gold border under 12000', expectedColor: 'maroon', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 12000 },
  { id: 8, query: 'Peacock teal blue chanderi silk lightweight drape', expectedColor: 'blue', expectedFabric: 'silk' },
  { id: 9, query: 'Pure gold tissue 24k zari saree for reception under 15000', expectedColor: 'gold', expectedFabric: 'tissue', expectedOccasion: 'reception', expectedMaxPrice: 15000 },
  { id: 10, query: 'Royal maroon bridal brocade kanchipuram for muhurtham', expectedColor: 'maroon', expectedFabric: 'kanchipuram', expectedOccasion: 'wedding' },
  { id: 11, query: 'Crimson red kanchipuram butta under ₹9,000', expectedColor: 'red', expectedFabric: 'kanchipuram', expectedMaxPrice: 9000 },
  { id: 12, query: 'Banarasi silk in navy blue color under 10k', expectedColor: 'blue', expectedFabric: 'banarasi', expectedMaxPrice: 10000 },
  { id: 13, query: 'Handloom kuttu saree in emerald green under 8000', expectedColor: 'green', expectedFabric: 'kuttu', expectedMaxPrice: 8000 },
  { id: 14, query: 'Shimmering metallic tissue saree in champagne gold', expectedColor: 'gold', expectedFabric: 'tissue' },
  { id: 15, query: 'Traditional silk saree for festive diwali celebration', expectedFabric: 'silk', expectedOccasion: 'festival' },
  { id: 16, query: 'Red kanchipuram under 10000', expectedColor: 'red', expectedFabric: 'kanchipuram', expectedMaxPrice: 10000 },
  { id: 17, query: 'Navy blue reception saree', expectedColor: 'blue', expectedOccasion: 'reception' },
  { id: 18, query: 'Green festival silk saree under 7500', expectedColor: 'green', expectedFabric: 'silk', expectedOccasion: 'festival', expectedMaxPrice: 7500 },
  { id: 19, query: 'Gold tissue party wear below 9000', expectedColor: 'gold', expectedFabric: 'tissue', expectedMaxPrice: 9000 },
  { id: 20, query: 'Burgundy bridal saree under 10000', expectedColor: 'maroon', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 21, query: 'Wedding saree under 10k in red', expectedColor: 'red', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 22, query: 'Traditional kanchipuram under 9000', expectedFabric: 'kanchipuram', expectedMaxPrice: 9000 },
  { id: 23, query: 'Reception silk saree under 10000', expectedFabric: 'silk', expectedOccasion: 'reception', expectedMaxPrice: 10000 },
  { id: 24, query: 'Festive temple kuttu saree under 7000', expectedFabric: 'kuttu', expectedOccasion: 'festival', expectedMaxPrice: 7000 },
  { id: 25, query: 'Metallic tissue rose gold drape under 8500', expectedColor: 'gold', expectedFabric: 'tissue', expectedMaxPrice: 8500 },
  { id: 26, query: 'Deep maroon wedding silk saree under 10000', expectedColor: 'maroon', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 27, query: 'Teal blue lightweight festive saree', expectedColor: 'blue', expectedOccasion: 'festival' },
  { id: 28, query: '24k gold zari bridal saree under 15000', expectedColor: 'gold', expectedOccasion: 'wedding', expectedMaxPrice: 15000 },
  { id: 29, query: 'Traditional silk red wedding saree below 10k', expectedColor: 'red', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 30, query: 'Blue banarasi brocade for evening wedding below 10000', expectedColor: 'blue', expectedFabric: 'banarasi', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 31, query: 'Kuttu temple weave green silk under 7000', expectedColor: 'green', expectedFabric: 'kuttu', expectedMaxPrice: 7000 },
  { id: 32, query: 'Tissue silk in rose gold tone below 8000', expectedColor: 'gold', expectedFabric: 'tissue', expectedMaxPrice: 8000 },
  { id: 33, query: 'Burgundy velvet border saree for wedding reception', expectedColor: 'maroon', expectedOccasion: 'reception' },
  { id: 34, query: 'Peacock teal chanderi under 6500', expectedColor: 'blue', expectedMaxPrice: 6500 },
  { id: 35, query: 'Pure gold saree under 15000', expectedColor: 'gold', expectedMaxPrice: 15000 },
  { id: 36, query: 'Maroon kanchipuram bridal under 9500', expectedColor: 'maroon', expectedFabric: 'kanchipuram', expectedOccasion: 'wedding', expectedMaxPrice: 9500 },
  { id: 37, query: 'Red silk butta saree below 10000', expectedColor: 'red', expectedFabric: 'silk', expectedMaxPrice: 10000 },
  { id: 38, query: 'Navy brocade saree under 10000', expectedColor: 'blue', expectedMaxPrice: 10000 },
  { id: 39, query: 'Temple green saree under 7000', expectedColor: 'green', expectedMaxPrice: 7000 },
  { id: 40, query: 'Champagne gold tissue under 8000', expectedColor: 'gold', expectedFabric: 'tissue', expectedMaxPrice: 8000 },
  { id: 41, query: 'Wedding silk saree red color under 10000', expectedColor: 'red', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 42, query: 'Banarasi royal blue under 10k', expectedColor: 'blue', expectedFabric: 'banarasi', expectedMaxPrice: 10000 },
  { id: 43, query: 'Korvai kuttu green saree under 7000', expectedColor: 'green', expectedFabric: 'kuttu', expectedMaxPrice: 7000 },
  { id: 44, query: 'Rose gold party saree under 8000', expectedColor: 'gold', expectedMaxPrice: 8000 },
  { id: 45, query: 'Maroon bridal brocade under 10000', expectedColor: 'maroon', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 46, query: 'Red wedding silk under 10000', expectedColor: 'red', expectedFabric: 'silk', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
  { id: 47, query: 'Navy reception brocade below 10000', expectedColor: 'blue', expectedOccasion: 'reception', expectedMaxPrice: 10000 },
  { id: 48, query: 'Green festival kuttu under 7000', expectedColor: 'green', expectedFabric: 'kuttu', expectedOccasion: 'festival', expectedMaxPrice: 7000 },
  { id: 49, query: 'Tissue silk for cocktail reception', expectedFabric: 'tissue', expectedOccasion: 'reception' },
  { id: 50, query: 'Kanchipuram bridal saree in red under ₹10,000', expectedColor: 'red', expectedFabric: 'kanchipuram', expectedOccasion: 'wedding', expectedMaxPrice: 10000 },
];
