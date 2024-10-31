import db from "../config/database";
import { Product } from "../models/types";

export class ProductService {
  getAllProducts(category?: string): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      const query = category
        ? "SELECT * FROM products WHERE category = ?"
        : "SELECT * FROM products";
      const params = category ? [category] : [];

      db.all(query, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Product[]);
      });
    });
  }

  getProductById(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row as Product);
      });
    });
  }

  createProduct(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      const { name, image, price, description, category } = product;
      db.run(
        "INSERT INTO products (name, image, price, description, category) VALUES (?, ?, ?, ?, ?)",
        [name, image, price, description, category],
        function (err) {
          if (err) reject(err);
          else resolve({ ...product, id: this.lastID });
        }
      );
    });
  }
}