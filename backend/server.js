import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
// Use a configurable port so the backend can start even when another local service uses 5000.
const PORT = 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable cross-origin requests for the frontend application.
app.use(cors());
app.use(express.json());

/**
 * Reads the products data file from disk and returns the parsed JSON array.
 * @returns {Promise<Array<object>>} The list of products stored in the backend data file.
 */
async function loadProducts() {
  const filePath = path.join(__dirname, "data", "products.json");
  const rawData = await readFile(filePath, "utf8");
  return JSON.parse(rawData);
}

/**
 * Returns a list of all available products.
 */
app.get("/api/products", async (req, res) => {
  try {
    const products = await loadProducts();
    res.json(products);
  } catch (error) {
    console.error("Failed to load products:", error);
    res.status(500).json({ message: "Unable to load products." });
  }
});

/**
 * Returns a single product by its id.
 */
app.get("/api/products/:id", async (req, res) => {
  try {
    const products = await loadProducts();
    const product = products.find((item) => item.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    res.json(product);
  } catch (error) {
    console.error("Failed to load a single product:", error);
    res.status(500).json({ message: "Unable to load product." });
  }
});

/**
 * Starts the backend server on the defined port.
 * The server binds to all interfaces so the frontend can connect locally and in development.
 */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server is running at http://localhost:${PORT}`);
});
