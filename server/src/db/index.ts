import mongoose, { Connection } from "mongoose";


export const connectDB = async (): Promise<Connection | void> => {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error(" MONGODB_URI is not defined in environment variables");
    }

    const uri = `${process.env.DATABASE_URL}/${process.env.DB_NAME}`;
    const connectionInstance = await mongoose.connect(uri);
    return connectionInstance.connection;
  } catch (error) {
    console.error(" MongoDB connection error:", (error as Error).message);
    process.exit(1);
  }
};
