
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Main code yhi he||  2- PART OF THE CODE
//                 \/ sirf ye example he ke persist kahahn ayega 

// export const useCartStore = create()(
//   persist(
//     (set, get) => ({
//       cartItems: [], // Aapka purana state
      
//       addToCart: (product) => {
//         // Aapka purana add logic
//       },
      
//       removeFromCart: (productId) => {
//         // Aapka purana remove logic
//       },
      
//       clearCart: () => set({ cartItems: [] }),
//     }),
//     {
//       name: 'royal-cart-storage', // Yeh naam browser ke local storage mein dikhega
//     }
//   )
// );