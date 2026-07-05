
import express from "express";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import toiletRoutes from "./routes/toiletRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import demandRoutes from "./routes/demandRoutes.js";
import issueReportRoutes from "./routes/issueReportRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000

app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

connectDB();

app.use("/api/toilets", toiletRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/demands",demandRoutes);
app.use("/api/issues", issueReportRoutes);
app.use("/api/dashboard", dashboardRoutes);


// app.get("/", (req, res) => {
//   res.send("API Running");
// });

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});