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
        e.preventDefault(); // HTML loading state
        if (!query.trim()) return; 

        setError("");
        startTransition(async () => { // Calling Server Action
            const res = await askRoyalAssistant(query); 
            if (res.success && res.data) {
                setResult(res.data);
            } else {
                setError(res.error || "Kuch gadbad ho gayi.");
            }
        });
    };

    return (
        <div className="w-full max-w-2xl mx-auto my-8 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white">
            <h2 className="text-lg font-semibold mb-3 text-amber-400">
                ✨ Royal AI Shopping Assistant
            </h2>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={query} // React Updates after click 
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask Me"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-sm focus:outline-none focus:border-amber-400"
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-medium text-sm disabled:opacity-50 cursor-pointer"
                >
                    {isPending ? "Searching" : "Ask AI"}
                </button>
            </form>

            {/* Error State */}
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

            {/* AI Response & Recommended Products */}
            {result && (
                <div className="mt-5 space-y-4">
                    <p className="text-sm text-zinc-200 bg-zinc-800/60 p-3.5 rounded-xl">
                        {result.reply}
                    </p>

                    {result.recommendedProducts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {result.recommendedProducts.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800"
                                >
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className="font-medium text-sm text-white">
                                            {item.name}
                                        </h3>
                                        <span className="text-xs font-semibold text-amber-400 shrink-0">
                                            ₹{item.price.toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1.5">{item.reason}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}