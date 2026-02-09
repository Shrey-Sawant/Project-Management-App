import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error(" DATABASE_URL is not defined in environment variables");
        }
        const connectionInstance = await mongoose.connect(process.env.DATABASE_URL, {
            dbName: process.env.DB_NAME || "Project0",
        });
        return connectionInstance.connection;
    }
    catch (error) {
        console.error(" MongoDB connection error:", error.message);
        process.exit(1);
    }
};
