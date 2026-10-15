"use client"; // Required for DOM interactivity (onClick handler)
import { useCartStore } from "@/store/useCartStore";

// TypeScript Interface:
interface ButtonProps {
    item: {
        _id: string;
        name: string;
        price: number;
    };
}

export default function AddToCartButton({ item }: ButtonProps) {
    // Extract addToCart mutation from global store
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <button
            // Jab click hoga, toh yeh specific 'item' store mein bhej diya jayega
            onClick={() => addToCart(item)}
            className="w-full mt-4 bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition-all shadow-md active:scale-95"
        >
            🛒 Add to Cart
        </button>
    );
}

