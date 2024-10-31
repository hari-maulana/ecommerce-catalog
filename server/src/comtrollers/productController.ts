import { Request, Response } from "express";
import { ProductService } from "../services/productService";

const productService = new ProductService();

export class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const category = req.query.category as string;
      const products = await productService.getAllProducts(category);
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productService.getProductById(Number(req.params.id));
      if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
      }
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await productService.createProduct(req.body);
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}