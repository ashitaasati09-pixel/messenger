import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME as string;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
    
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}