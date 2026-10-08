"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { addProducts } from "@/actions/productActions";

const initialState = {
    success: false,
    message: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={`px-6 py-3 rounded-lg font-semibold transition-all shadow-md mt-2 text-white ${pending ? "bg-gray-200 cursor-not-allowed" : "bg-slate-800 hover:bg-slate-600"
                }`}
        >
            {pending ? "Saving... ⏳" : "➕ Save to Royal Collection"}
        </button>
    );
}

export default function AddProductForm() {
    const [state, formAction] = useActionState(addProducts, initialState);

    return (
        <div className=" p-8 rounded-xl bg-zinc-700 mb-10 w-full max-w-md shadow-sm">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">Add New Product ✍️</h1>

            <form action={formAction} className="flex flex-col gap-4 ">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name (e.g. Diamond Ring)"
                    className="border border-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-zinc-800 transition-all text-white"
                />
                <input
                    type="text"
                    name="price"
                    placeholder="Price (e.g. 50000)"
                    className="border border-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-4 focus:ring-zinc-800 transition-all text-white"
                />

                {/* Product Image Upload */}
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL (e.g. https://..)"
                    required
                    className="border border-zinc-500 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white bg-transparent text-zinc-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-zinc-100 file:text-zinc-900 hover:file:bg-zinc-200"
                />

                {state?.message && (
                    <p className={`font-semibold text-center ${state.success ? "text-green-600" : "text-red-500"}`}>
                        {state.message}
                    </p>
                )}

                <SubmitButton />
            </form>
        </div>
    );
}