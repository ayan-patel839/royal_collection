"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addProducts } from "@/actions/productActions";

const initialState = {
    success: false,
    message: "",
};

// Naya loading button
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md mt-2 text-white ${pending ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                }`}
        >
            {pending ? "Saving... ⏳" : "➕ Save to Royal Collection"}
        </button>
    );
}

export default function AddProductForm() {
    const [state, formAction] = useActionState(addProducts, initialState);

    return (
        <div className="border-2 border-dashed border-gray-400 p-8 rounded-xl bg-white mb-10 w-full max-w-md shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product ✍️</h1>

            <form action={formAction} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name (e.g. Diamond Ring)"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price (e.g. 50000)"
                    className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
                />

                {state?.message && (
                    <p className={`font-semibold text-center ${state.success ? "text-green-600" : "text-red-500"}`}>
                        {state.message}
                    </p>
                )}

                {/* Humara smart button */}
                <SubmitButton />
            </form>
        </div>
    );
}