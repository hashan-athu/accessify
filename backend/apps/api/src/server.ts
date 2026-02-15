import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import scanRoutes from "./routes/scan";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/scan", scanRoutes);


app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "accessify-api",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
