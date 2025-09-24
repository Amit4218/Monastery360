import express from "express";
import cors from "cors";
import connectDb from "./config/db.config.js";
import authMiddleware from "./middleware/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import aichatbotRoutes from "./routes/aichatbot.routes.js";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth/user", authRoutes);
app.use("/", aichatbotRoutes);
// app.use("/user", authMiddleware, dataRoute);

app.listen(PORT, () => {
  console.log(`app running at ${PORT}`);
});
