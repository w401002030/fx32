import { create } from 'zustand';
import { Product } from '@/data/mock-products';
// This store is deprecated as the site has pivoted to a Lead Generation model.
// Maintaining an empty interface to prevent breaking imports during transition if any remain.
interface CartState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}
export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
}));