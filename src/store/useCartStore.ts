
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. TypeScript Interface (MongoDB data 100% match) from this.
interface CartItem {
  _id: string;  
  name: string;
  price: number;
}

// 2. Store ka Interface
interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void; 
}

// 3. Global Store Creation
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) => 
        set((state) => ({
          cart: [...state.cart, item]
        })),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'royal-cart-storage', 
    }
  )
);

