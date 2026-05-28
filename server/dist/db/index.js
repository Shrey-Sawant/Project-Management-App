import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
        if (!mongoUri) {
            throw new Error("Neither MONGODB_URI nor DATABASE_URL is defined in environment variables");
        }
        const connectionInstance = await mongoose.connect(mongoUri, {
            dbName: process.env.DB_NAME || "Project0",
        });
        console.log('[4] MongoDB connected successfully');
        return connectionInstance.connection;
    }
    catch (error) {
        console.error('[FATAL] MongoDB connection failed:', error.message);
        process.exit(1);
    }
};
