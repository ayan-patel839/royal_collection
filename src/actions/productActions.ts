"use server";

import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { productSchema } from "@/lib/zodSchemas";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 1. Database se Products laana
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

// 2. Naya Product Add karna (Cloudinary Integration ke sath)
export async function addProducts(prevState: any, formData: FormData) {
  try {
    await connectDB();

    // Step A: Form se raw inputs nikalna
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const imageFile = formData.get("image") as File;

    // Agar user ne file select nahi ki hai toh yahi se error return kar dein
    if (!imageFile || imageFile.size === 0) {
      return { success: false, message: "Please select an image file!" };
    }

    // Step B: File ko Buffer mein convert karna (Vercel Serverless Architecture ke liye)
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Step C: Cloudinary par image upload karna
    const secureUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "royal_collection" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url as string);
        }
      ).end(buffer);
    });

    console.log("🚀 Cloudinary Live URL:", secureUrl);

    // Step D: Ab data ko Zod ke format mein arrange karna (image ab string URL ban chuki hai)
    const rawData = {
      name: name,
      price: Number(price),
      image: secureUrl, // 🚀 Direct Cloudinary ka link jayega
    };

    // Step E: Zod Validation
    const validatedData = productSchema.safeParse(rawData);
    if (!validatedData.success) {
      return { success: false, message: validatedData.error.issues[0].message };
    }

    // Step F: MongoDB mein save karna aur UI update karna
    await Product.create({
      ...validatedData.data,
      image: secureUrl // 🚀 Hum explicitly Cloudinary ka link Mongo ko de rahe hain
    });
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Product Added Successfully! 🎉" };

  } catch (error) {
    console.log("Real Error during product add:", error);
    return { success: false, message: "Server Error during upload!" };
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