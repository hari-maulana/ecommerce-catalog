import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});