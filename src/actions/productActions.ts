"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

// 1. Database se Products laana (Yeh galti se delete ho gaya tha)
export async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    // Next.js ko plain object chahiye hota hai
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// 2. Naya Product Add karna
export async function addProducts(prevState: any, formData: FormData) {
  try {
    await connectDB();
    const rawData = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      image: "https://via.placeholder.com/150", // 🚀 Yeh default image pass kar degi taaki database error na aaye
    };

    // Zod Validation
    const validatedData = productSchema.safeParse(rawData);
    if (!validatedData.success) {
      return { success: false, message: validatedData.error.issues[0].message };
    }

    await Product.create(validatedData.data);
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true, message: "Product Added! 🎉" };
  } catch (error) {
    console.log("Real Error during product add:", error);
    return { success: false, message: "Server Error!" };
  }
}
// 3. Product Delete karna
export async function deleteProduct(id: string) {
  try {
    await connectDB();
    await Product.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin");
  } catch (error) {
    console.log("Delete error", error);
  }
}

// 4. Product Update karna
export async function updateProduct(id: string, formData: FormData) {
  try {
    await connectDB();
    const name = formData.get("name");
    const price = Number(formData.get("price"));
    await Product.findByIdAndUpdate(id, { name, price });
    revalidatePath("/");
    revalidatePath("/admin");
  } catch (error) {
    console.log("Update error", error);
  }
}