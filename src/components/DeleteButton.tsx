"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/actions/productActions";

interface DeleteProps {
    productId: string;
}

export default function DeleteButton({ productId }: DeleteProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this product?")) {
            startTransition(async () => {
                await deleteProduct(productId);
            });
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg font-bold text-sm overflow-hidden transition-all shadow-md active:scale-95 ${isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
                }`}
        >
            {isPending ? "Deleting... ⏳" : "Delete 🗑️"}
        </button>
    );
};