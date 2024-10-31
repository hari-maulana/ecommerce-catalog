import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(Number(port), "0.0.0.0", () => {
  // Added host parameter
  console.log(`Server running at http://0.0.0.0:${port}`);
  console.log(`API Documentation available at http://0.0.0.0:${port}/api-docs`);
});
