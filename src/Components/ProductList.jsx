import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { inputText } from "../App";

const ProductList = ({ filterProducts = [] }) => {
  const { filterValue } = useContext(inputText);
  const [finalProducts, setFinalProducts] = useState([]);

  /**
   * Applies the current search text to the already-filtered product list.
   * This keeps the search behavior working even when category or price filters are active.
   */
  useEffect(() => {
    const searchText = filterValue.toLowerCase().trim();

    // Start from the product list provided by the parent component.
    let result = filterProducts;

    // If a search string is present, narrow the results by matching title, price, or image path.
    if (searchText !== "") {
      result = filterProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchText) ||
          product.price.toLowerCase().includes(searchText) ||
          product.image.toLowerCase().includes(searchText),
      );
    }

    setFinalProducts(result);
  }, [filterValue, filterProducts]);

  return (
    <>
      {finalProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        finalProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </>
  );
};

export default ProductList;
