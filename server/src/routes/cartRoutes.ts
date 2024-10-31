import { Router } from "express";
import { CartController } from "../comtrollers/cartController";

const router = Router();
const cartController = new CartController();

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);

export default router;
