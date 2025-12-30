import { create } from 'zustand';
interface FilterState {
  priceRange: [number, number];
  maxDrawdown: number;
  selectedRisks: string[];
  selectedPlatforms: string[];
  selectedStrategies: string[];
  selectedPairs: string[];
  setPriceRange: (range: [number, number]) => void;
  setMaxDrawdown: (value: number) => void;
  toggleRisk: (risk: string) => void;
  togglePlatform: (platform: string) => void;
  toggleStrategy: (strategy: string) => void;
  togglePair: (pair: string) => void;
  resetFilters: () => void;
}
export const useFilterStore = create<FilterState>((set) => ({
  priceRange: [0, 2000],
  maxDrawdown: 10,
  selectedRisks: [],
  selectedPlatforms: [],
  selectedStrategies: [],
  selectedPairs: [],
  setPriceRange: (range) => set({ priceRange: range }),
  setMaxDrawdown: (value) => set({ maxDrawdown: value }),
  toggleRisk: (risk) => set((state) => ({
    selectedRisks: state.selectedRisks.includes(risk)
      ? state.selectedRisks.filter((r) => r !== risk)
      : [...state.selectedRisks, risk],
  })),
  togglePlatform: (platform) => set((state) => ({
    selectedPlatforms: state.selectedPlatforms.includes(platform)
      ? state.selectedPlatforms.filter((p) => p !== platform)
      : [...state.selectedPlatforms, platform],
  })),
  toggleStrategy: (strategy) => set((state) => ({
    selectedStrategies: state.selectedStrategies.includes(strategy)
      ? state.selectedStrategies.filter((s) => s !== strategy)
      : [...state.selectedStrategies, strategy],
  })),
  togglePair: (pair) => set((state) => ({
    selectedPairs: state.selectedPairs.includes(pair)
      ? state.selectedPairs.filter((p) => p !== pair)
      : [...state.selectedPairs, pair],
  })),
  resetFilters: () => set({
    priceRange: [0, 2000],
    maxDrawdown: 10,
    selectedRisks: [],
    selectedPlatforms: [],
    selectedStrategies: [],
    selectedPairs: [],
  }),
}));