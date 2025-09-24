import express from "express";
import cors from "cors";
import connectDb from "./config/db.config.js";
import authMiddleware from "./middleware/auth.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth/user", authRoutes);
app.use("/user", authMiddleware, userRoutes);

app.listen(PORT, () => {
  console.log(`app running at ${PORT}`);
});
