import { Request, Response } from "express";
import { CartService } from "../services/cartService";

const cartService = new CartService();

export class CartController {
  async addToCart(req: Request, res: Response) {
    try {
      const { productId, quantity } = req.body;
      const cartItem = await cartService.addToCart(productId, quantity);
      res.json(cartItem);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getCart(req: Request, res: Response) {
    try {
      const cart = await cartService.getCart();
      res.json(cart);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }
}
