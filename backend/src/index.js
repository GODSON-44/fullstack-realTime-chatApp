import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socketIO.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// ================= MIDDLEWARE =================
app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

// ⚠️ CORS — allow Render + local
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://connect-a0yk.onrender.com", // your frontend URL
    ],
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// ================= PRODUCTION FRONTEND =================
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // ✅ SAFE fallback for React Router (Node 22 compatible)
  app.use((req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

// ================= SERVER =================
server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});
