import db from "../config/database";
import { CartItem } from "../models/types";

export class CartService {
  addToCart(productId: number, quantity: number): Promise<CartItem> {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT quantity FROM cart WHERE productId = ?",
        [productId],
        (err, row: any) => {
          if (err) reject(err);
          else if (row) {
            const newQuantity = row.quantity + quantity;
            this.updateCartItem(productId, newQuantity)
              .then((result) => resolve(result))
              .catch((err) => reject(err));
          } else {
            this.createCartItem(productId, quantity)
              .then((result) => resolve(result))
              .catch((err) => reject(err));
          }
        }
      );
    });
  }

  private updateCartItem(
    productId: number,
    quantity: number
  ): Promise<CartItem> {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE cart SET quantity = ? WHERE productId = ?",
        [quantity, productId],
        (err) => {
          if (err) reject(err);
          else resolve({ productId, quantity });
        }
      );
    });
  }

  private createCartItem(
    productId: number,
    quantity: number
  ): Promise<CartItem> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO cart (productId, quantity) VALUES (?, ?)",
        [productId, quantity],
        function (err) {
          if (err) reject(err);
          else resolve({ id: this.lastID, productId, quantity });
        }
      );
    });
  }

  getCart(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT cart.id, products.name, products.image, products.description, 
         products.price, cart.quantity, products.price * cart.quantity AS total
         FROM cart
         JOIN products ON cart.productId = products.id`,
        [],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}
