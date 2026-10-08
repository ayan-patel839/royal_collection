"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

// 1. Naya Product Add karna (Normal aur Clean Approach)
export async function addProducts(prevState: any, formData: FormData) {
  try {
    await connectDB();

    // FormData se basic details nikalna (Image ka direct URL aayega)
    const rawData = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      image: formData.get("image"), // Direct URL (No Cloudinary buffer magic)
    };

    // Zod se Validate karna
    const validatedData = productSchema.safeParse(rawData);

    if (!validatedData.success) {
      console.log("Validation Error:", validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        message: "Please fill all fields correctly!"
      };
    }

    // Database mein save karna
    await Product.create(validatedData.data);

    // Cache clear karna taaki UI turant update ho jaye
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Product added successfully!" };

  } catch (error) {
    console.error("Add product error:", error);
    return { success: false, message: "Server Error during upload!" };
  }
}


// 2. Database se Products laana
export async function getProducts() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
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