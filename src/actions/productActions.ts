"use server";

import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

// 1. Create a new product entry
export async function addProducts(prevState: any, formData: FormData) {
  try {
    await connectDB();

    // Extract payload from FormData
    const rawData = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      image: formData.get("image"), // Expecting direct URL string
    };

    // Validate payload against schema
    const validatedData = productSchema.safeParse(rawData);

    if (!validatedData.success) {
      console.log("Validation Error:", validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        message: "Please fill all fields correctly!"
      };
    }

    // Persist validated data to database
    await Product.create(validatedData.data);

    // Purge cache to reflect new data on UI
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Product added successfully!" };

  } catch (error) {
    console.error("Add product error:", error);
    return { success: false, message: "Server Error during upload!" };
  }
}


// 2. Fetch all products
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


// 3. Delete product by ID
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


// 4. Update existing product
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