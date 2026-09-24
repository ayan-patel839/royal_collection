"use client";

import { useTransition } from "react";
import { createCheckoutSession } from "@/actions/stripeActions";
import { useCartStore } from "@/store/useCartStore"; // Aapke store ka path
import { usePathname } from "next/navigation"; // 1. Hook ko import kijiye




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

  // Ye CartSummary Me agr success Hua to Cart Items nhi show honge 
  // Professinoal Move he Checkout Hide krna 

  const pathname = usePathname(); // 2. Current URL path ko read kijiye

  // 3. Asli Jadu: Agar route '/success' hai, toh cart ko mat dikhao (return null)
// Asli Jadu: Agar route '/success' hai YA '/admin' se shuru hota hai, toh cart ko mat dikhao
  if (pathname === "/success" || pathname?.startsWith("/admin")) {
    return null;
  }



  // Agar cart khali hai, toh yeh component kuch nahi dikhayega (null)
  if (cart.length === 0) return null;

  return (

    <div className="fixed bottom-0 left-0 w-full bg-black/85 backdrop-blur-xl border-t border-zinc-800 p-4 shadow-2xl z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Left Side: Cart Info */}
        <div>
          <h3 className="text-sm font-extrabold text-white tracking-widest uppercase mb-1">
            Cart Summary
          </h3>
          <p className="text-sm text-zinc-400 font-medium">{cart.length} Items Selected</p>
        </div>

        {/* Right Side: Total & Action */}
        <div className="flex items-center gap-6 md:gap-10">
          <div className="text-right hidden md:block">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">Grand Total</p>
            {/* ₹ ko bhi format kar diya taaki commas sahi aayen */}
            <p className="text-3xl font-extrabold text-white tracking-tighter">
              ₹{totalBill.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Premium Apple-Style Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isPending}
            className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-2xl active:scale-95 flex items-center justify-center gap-3 min-w-[160px] ${
              isPending 
                ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700" 
                : "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            }`}
          >
            {isPending ? (
               <>
                 <span className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin"></span>
                 PROCESSING...
               </>
            ) : (
               <>
                 CHECKOUT <span>➔</span>
               </>
            )}
          </button>
        </div>
      </div>
    </div>

  );
}