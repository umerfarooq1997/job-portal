import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  }),
);

app.use(express.json());

// Auth Routes
app.use("/api/v1/auth", authRoutes);

export default app;
