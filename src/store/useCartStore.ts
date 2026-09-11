import { create } from 'zustand';

// 1. TypeScript Interface (MongoDB wale data se 100% match)
interface CartItem {
  _id: string;   // 🚀 Underscore ke sath id
  name: string;
  price: number;
}

// 2. Store ka Interface
interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

// 3. Global Store Creation
export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (item) => 
    set((state) => ({ 
      cart: [...state.cart, item] 
    })),
}));