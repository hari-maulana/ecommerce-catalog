import sqlite3 from "sqlite3";
import path from "path";

const DATA_DIR = path.join(__dirname, "../../data");

import fs from "fs";
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const DB_PATH = path.join(DATA_DIR, "database.sqlite");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

const initDatabase = () => {
  db.serialize(() => {
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
  });
};

initDatabase();

export default db;
