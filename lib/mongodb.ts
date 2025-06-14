import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    console.log(process.env.MONGODB_URI);
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};