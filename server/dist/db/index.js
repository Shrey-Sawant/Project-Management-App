"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error(" MONGODB_URI is not defined in environment variables");
        }
        const uri = `${process.env.DATABASE_URL}/${process.env.DB_NAME}`;
        const connectionInstance = await mongoose_1.default.connect(uri);
        return connectionInstance.connection;
    }
    catch (error) {
        console.error(" MongoDB connection error:", error.message);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
