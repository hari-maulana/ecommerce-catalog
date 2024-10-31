import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Basic error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(
    `API Documentation available at http://localhost:${port}/api-docs`
  );
});
