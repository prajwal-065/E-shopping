import React, { useContext, useState } from "react";
import { inputText } from "../App";
import Cart from "./Cart";

const ProductView = () => {
  const {
    selectedProduct,
    handleBack,
    updatecartitem,
    setBuyNowItem,
    setShowCheckout,
    setShowCart,
    formatPrice,
  } = useContext(inputText);

  const [localQuantity, setlocalQuantity] = useState(1);

  const numericPrice = Number(selectedProduct.price.replace(/[^\d.]/g, ""));

  return (
    <div className="content-1">
      <button className="back-btn" onClick={handleBack}>
        ← Back
      </button>
      <div className="class-one">
        <div className="product-left">
          <img className="main-img" src={selectedProduct.image} />
          <div className="thumb-container">
            <img className="thumb-img" src={selectedProduct.hoverImage} />
          </div>
        </div>
        <div className="product-right">
          <h1>{selectedProduct.title}</h1>
          <p className="product-price">
            {formatPrice(selectedProduct.priceValue)}
          </p>
          <p className="qty-label">Quantity</p>
          <div className="quantity-box">
            <button onClick={() => setlocalQuantity((q) => Math.max(1, q - 1))}>
              -
            </button>
            <span>{localQuantity}</span>
            <button onClick={() => setlocalQuantity((q) => q + 1)}>+</button>
          </div>
          <button
            className="add-cart"
            onClick={() => {
              updatecartitem({
                ...selectedProduct,
                quantity: Number(localQuantity),
                price: numericPrice,
              });
              alert(selectedProduct.title + localQuantity + " Added to Cart");
            }}
          >
            Add to cart
          </button>
          <button
            className="buy-now"
            onClick={() => {
              setBuyNowItem({
                ...selectedProduct,
                quantity: Number(localQuantity),
                price: numericPrice,
              });
              setShowCart(true);
              setShowCheckout(true);
            }}
          >
            Buy it now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
