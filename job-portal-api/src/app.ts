import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.routes.js";
import jobRoutes from "./routes/job.routes.js";

//Error handler
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Auth Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", jobRoutes);

app.use(errorHandler);

export default app;
