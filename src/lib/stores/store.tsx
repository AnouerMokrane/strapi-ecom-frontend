import { create } from "zustand";

type State = {
  selectedCategories: string[];
  selectedColors: number[];
  selectedSizes: number[];
  priceRange: number;
};

type Actions = {
  addCategory: (id: string, isChecked: boolean) => void;
  addColors: (id: number) => void;
  addSizes: (id: number) => void;
  setPriceRange: (price: number) => void;
};

export const useStore = create<State & Actions>((set) => ({
  selectedCategories: [],
  selectedColors: [],
  selectedSizes: [],
  priceRange: 1000,
  addCategory: (id, isChecked) =>
    set((state) => ({
      selectedCategories: isChecked
        ? [...state.selectedCategories, id]
        : state.selectedCategories.filter((categoryId) => categoryId !== id),
    })),
  addColors: (id) =>
    set((state) => ({
      selectedColors: state.selectedColors.includes(id)
        ? state.selectedColors.filter((colorId) => colorId !== id)
        : [...state.selectedColors, id],
    })),
  addSizes: (id) =>
    set((state) => ({
      selectedSizes: state.selectedSizes.includes(id)
        ? state.selectedSizes.filter((sizeId) => sizeId !== id)
        : [...state.selectedSizes, id],
    })),
  setPriceRange: (price) => set(() => ({ priceRange: price })),
}));
