"use client";

import { useState } from "react";
import { updateProduct } from "@/actions/productActions";

export default function EditButton({ productId, currentName, currentPrice }: { productId: string; currentName: string; currentPrice: number }) {
    const [show, setShow] = useState(false);

    if (!show) return <button onClick={() => setShow(true)} className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">Edit ✏️</button>;

    return (
        <form action={async (formData) => { await updateProduct(productId, formData); setShow(false); }}
            className="flex gap-2 mt-1 items-center ">
            <input name="name"
                defaultValue={currentName}
                className="border text-xs w-20 text-white p-1 rounded" required />

            <input name="price"
                type="number"
                defaultValue={currentPrice}
                className="border text-xs w-16 text-white p-1 rounded" required />

            <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">Save</button>
            <button type="button" onClick={() => setShow(false)} className="text-gray-500 text-xs font-bold">✕</button>
        </form>
    );
}