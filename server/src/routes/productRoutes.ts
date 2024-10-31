import { Router } from "express";
import { ProductController } from "../comtrollers/productController";

const router = Router();
const productController = new ProductController();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);

export default router;