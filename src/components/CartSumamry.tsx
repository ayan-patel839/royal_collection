"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/actions/stripeActions";
import { useCartStore } from "@/store/useCartStore"; // Aapke store ka path

export default function CartSummary() {
  // 1. Zustand se poora cart dabba (array) nikal liya
  const cart = useCartStore((state) => state.cart);

  // 2. Apna Smart Cashier (.reduce) jo total bill calculate karega
  const totalBill = cart.reduce((total, item) => total + item.price, 0);

  // 🚀 NAYA ADDITION 1: Loading (Pending) state handle karne ka hook
  const [isPending, startTransition] = useTransition();

  // 🚀 NAYA ADDITION 2: Button dabne par chalne wala Smart Function
  const handleCheckout = () => {
    startTransition(async () => {
      const data = await createCheckoutSession(cart);
      if (data.url) {
        window.location.href = data.url; // Stripe ke secure page par bhejna
      } else {
        alert("Checkout Error: " + data.error);
      }
    });
  };

  // Agar cart khali hai, toh yeh component kuch nahi dikhayega (null)
  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-green-400">Your Cart Summary</h3>
          <p className="text-sm text-gray-400">{cart.length} items added</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm text-gray-400">Grand Total</p>
            {/* 🚀 Yahan humara calculate kiya hua totalBill print ho raha hai */}
            <p className="text-2xl font-bold text-green-400">₹{totalBill}</p>
          </div>

          {/* 🚀 NAYA ADDITION 3: Button mein onClick aur isPending lagaya */}
          <button
            onClick={handleCheckout}
            disabled={isPending}
            className={`px-6 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95 ${isPending ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {isPending ? "Redirecting... ⏳" : "Checkout 💳"}
          </button>
        </div>
      </div>
    </div>
  );
}