"use client";

import { useCartStore } from "@/store/useCartStore";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const cart = useCartStore((state) => state.cart);

    const pathname = usePathname();

    // Agar current URL /success (ya aapke order page ka jo bhi naam hai) hai, toh Navbar return mat karo
    if (pathname === '/success' || pathname === '/login' || pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <nav className="bg-black text-white p-4 sticky top-0 z-50 border-b border-zinc-800/80 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-extrabold tracking-widest text-white uppercase">
                    Royal Collection <span className="text-xl">👑</span>
                </h1>

                {/* Apple-style minimalist Cart Badge */}
                <div className="flex items-center gap-3 bg-zinc-900/50 hover:bg-zinc-800 px-5 py-2 rounded-full border border-zinc-700 transition-colors cursor-pointer">
                    <span className="text-lg">🛒</span>
                    <span className="font-bold text-lg text-white">
                        {cart.length}
                    </span>
                </div>
            </div>
        </nav>
    );
}