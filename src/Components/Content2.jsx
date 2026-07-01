import React, { useContext, useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductView from "./ProductView";
import { inputText } from "../App";
import Cart from "./Cart";
import Checkout from "./Chekout";

const Content2 = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(70);
  const { productClicked, showcart, showCheckout } = useContext(inputText);

  /**
   * Fetches the catalog from the backend API once the component mounts.
   * This keeps the product catalog in the backend JSON file instead of the frontend bundle.
   */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(
          "https://e-shopping-blond.vercel.app/api/products",
        );

        if (!response.ok) {
          throw new Error("Unable to load products from the backend.");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  /**
   * Toggles a selected category filter in the category list.
   * @param {string} value - The category value to add or remove.
   */
  const toggleCategory = (value) => {
    setCategories((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value],
    );
  };

  /**
   * Filters the products by the selected category and maximum price value.
   * If no category or price filter is active, the complete catalog is returned.
   */
  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      categories.length === 0 || categories.includes(product.category);

    const priceMatch = product.priceValue <= maxPrice;

    return categoryMatch && priceMatch;
  });

  if (showcart) {
    return showCheckout ? <Checkout /> : <Cart />;
  }

  if (productClicked) {
    return <ProductView />;
  }

  return (
    <div className="content-2 d-none">
      <div className="category" id="filterBox">
        <div className="cate-f">
          <h3>Category</h3>
          <div className="label">
            <label>
              <input
                type="checkbox"
                className="category-filter"
                value="cap"
                onChange={() => toggleCategory("cap")}
              />
              Cap
            </label>
            <label>
              <input
                type="checkbox"
                className="category-filter"
                value="t-shirt"
                onChange={() => toggleCategory("t-shirt")}
              />
              T‑Shirt
            </label>
            <label>
              <input
                type="checkbox"
                className="category-filter"
                value="sweater"
                onChange={() => toggleCategory("sweater")}
              />
              Sweater
            </label>
          </div>
        </div>
        <div className="cate-f">
          <h3>Price</h3>
          <div className="label">
            <label htmlFor="priceRange">Max Price: ${maxPrice}</label>
            <input
              id="priceRange"
              type="range"
              min="30"
              max="70"
              step="1"
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <ProductList filterProducts={filteredProducts} />
      </div>
    </div>
  );
};

export default Content2;
