import express, { Request, Response } from "express";
import sqlite3 from "sqlite3";

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Create SQLite database connection
const db = new sqlite3.Database("database.sqlite", (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

// Create tables for products and cart
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image TEXT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    description TEXT,
    category TEXT NOT NULL
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id)
  )
`);

// Get all products berdsarkan filter
app.get("/products", (req: Request, res: Response) => {
  const category = req.query.category;
  const query = category 
    ? "SELECT * FROM products WHERE category = ?" 
    : "SELECT * FROM products";
  const params = category ? [category] : [];

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// ambil produk berdasarkan id
app.get("/products/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";

  db.get(query, [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.json(row);
  });
});

// Create a new product
app.post("/products", (req: Request, res: Response) => {
  const { name, image, price, description, category } = req.body;

  db.run(
    "INSERT INTO products (name, image, price, description, category) VALUES (?, ?, ?, ?, ?)",
    [name, image, price, description, category],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        id: this.lastID,
        name,
        image,
        price,
        description,
        category,
      });
    }
  );
});

// Add product to cart
app.post("/cart", (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  db.run(
    "INSERT INTO cart (productId, quantity) VALUES (?, ?)",
    [productId, quantity],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, productId, quantity });
    }
  );
});

// Get all items in the cart
app.get("/cart", (req: Request, res: Response) => {
  db.all(
    `SELECT cart.id, products.name, products.price, cart.quantity, products.price * cart.quantity AS total
     FROM cart
     JOIN products ON cart.productId = products.id`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
