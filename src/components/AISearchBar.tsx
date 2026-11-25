"use client";

import { useState, useTransition } from "react";
import { askRoyalAssistant } from "@/actions/ai-assistant";

type AIResult = {
    reply: string;
    recommendedProducts: {
        name: string;
        price: number;
        reason: string;
    }[];
};

export default function AISearchBar() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState<AIResult | null>(null);
    const [error, setError] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setError("");
        startTransition(async () => {
            const res = await askRoyalAssistant(query);
            if (res.success && res.data) {
                setResult(res.data);
            } else {
                setResult(null);
                setError(res.error || "Something Went Wrong.");
            }
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4 sm:px-0">
            <div className="rounded-2xl bg-zinc-900/90 border border-zinc-800/80 p-4 sm:p-6 shadow-2xl backdrop-blur-sm">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="text-base sm:text-lg">✨</span>
                    <h2 className="text-sm sm:text-base font-semibold tracking-wide text-amber-400">
                        Royal AI Shopping Assistant
                    </h2>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex items-center gap-2 sm:gap-3 w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ask for watches, headphones..."
                        disabled={isPending}
                        className="min-w-0 flex-1 rounded-xl bg-zinc-950/90 border border-amber-500/40 px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder:text-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 disabled:opacity-60 transition-all duration-300"
                    />

                    <button
                        type="submit"
                        disabled={isPending || !query.trim()}
                        className="shrink-0 whitespace-nowrap rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-zinc-950 shadow-md shadow-amber-500/10 transition-all duration-300 cursor-pointer"
                    >
                        {isPending ? "Searching..." : "Ask AI"}
                    </button>
                </form>

                {/* Error Message */}
                {error && (
                    <div className="mt-3 sm:mt-4 rounded-xl bg-red-950/50 border border-red-500/40 p-3.5 sm:p-4 text-xs sm:text-sm text-red-300">
                        {error}
                    </div>
                )}

                {/* AI Response Message */}
                {result?.reply && (
                    <div className="mt-3 sm:mt-4 rounded-xl bg-zinc-950/70 border border-zinc-800/80 p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed text-zinc-200">
                        {result.reply}
                    </div>
                )}

                {/* Recommended Products */}
                {result?.recommendedProducts && result.recommendedProducts.length > 0 && (
                    <div className="mt-3 space-y-2.5">
                        {result.recommendedProducts.map((product, index) => (
                            <div
                                key={`${product.name}-${index}`}
                                className="rounded-xl bg-zinc-950/90 border border-zinc-800 hover:border-amber-500/40 p-3.5 sm:p-4 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-sm sm:text-base font-semibold text-white">
                                        {product.name}
                                    </h3>
                                    <span className="shrink-0 text-sm sm:text-base font-bold text-amber-400">
                                        ₹{Number(product.price).toLocaleString("en-IN")}
                                    </span>
                                </div>
                                {product.reason && (
                                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-zinc-400">
                                        {product.reason}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}