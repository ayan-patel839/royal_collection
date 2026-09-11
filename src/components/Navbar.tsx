"use client"; // 🚀 Yeh line sabse zaroori hai!

import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
    // Zustand ke global store se sirf 'cart' array ko nikal rahe hain
    const cart = useCartStore((state) => state.cart);

    return (
        <nav className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wider text-green-400">
                    Royal Collection 👑
                </h1>

                {/* Dynamic Cart Badge */}
                <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full border border-gray-700">
                    <span className="text-xl">🛒</span>
                    {/* cart.length batayega ki array mein kitne items hain */}
                    <span className="font-semibold text-lg text-green-400">
                        {cart.length}
                    </span>
                </div>
            </div>
        </nav>
    );
}