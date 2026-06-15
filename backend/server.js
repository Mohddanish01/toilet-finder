import express from "express";
import connectDB from "./config/db.js";
import toiletRoutes from "./routes/toiletRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());

connectDB();

app.use("/api/toilets", toiletRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});