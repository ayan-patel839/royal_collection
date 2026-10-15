import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    
    if (mongoose.connection.readyState >= 1) {
      console.log("Database pehle se connected hai!");
      return;
    }

    // Secret Key
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB successfully connected 🚀");
    
  } catch (error) {
    console.error("Database connection mein error aaya: ", error);
  }
};