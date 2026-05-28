process.on('uncaughtException', (err) => {
  console.error('[uncaughtException]', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[unhandledRejection]', reason);
  process.exit(1);
});

console.log('[1] Starting server...');

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db/index.js";

import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

console.log('[2] Imports loaded');

dotenv.config();

const app = express();

// ====================
// Middlewares
// ====================
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration supporting credentials and Vercel deployments
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "https://project-management-app-phi-indol.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || /^https:\/\/project-management-.*\.vercel\.app$/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.options("*", cors()); // handle preflight for all routes

// ====================
// Routes
// ====================
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);

// ====================
// Start server after DB connection
// ====================
const PORT = process.env.PORT || 3000;

async function startServer() {  
  try {
    console.log('[3] Connecting to MongoDB...');
    await connectDB();

    console.log('[5] Starting HTTP server on port', PORT);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1); 
  }
}

startServer();
