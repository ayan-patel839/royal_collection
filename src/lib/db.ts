import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    // Agar database pehle se connected hai, toh dobara connect mat karo (Performance bachaane ke liye)
    if (mongoose.connection.readyState >= 1) {
      console.log("Database pehle se connected hai!");
      return;
    }

    // Naya connection banao (process.env.MONGODB_URI humari secret chabi hogi)
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB successfully connected 🚀");
    
  } catch (error) {
    console.error("Database connection mein error aaya: ", error);
  }
};