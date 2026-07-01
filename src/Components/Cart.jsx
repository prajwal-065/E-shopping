import React, { useContext } from "react";
import { inputText } from "../App";

const Cart = () => {
  const {
    addtocart,
    handleCart,
    increaseCartQty,
    decreaseCartQty,
    deleteCartItem,
    setShowCheckout,
    selectedItems,
    setSelectedItems,
    formatPrice,
  } = useContext(inputText);

  const handleCheckboxChange = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  const subtotal = addtocart.reduce((sum, item, index) => {
    if (!selectedItems.includes(index)) return sum;

    return sum + Number(item.price) * Number(item.quantity);
  }, 0);

  return (
    <div className="cart-view" id="cartView">
      <button className="back-btn" onClick={handleCart}>
        ← Back
      </button>
      <div className="cart-header">
        <h1>Your Cart</h1>
        <a href=" " className="continue-shopping">
          <h4>Continue Shopping</h4>
        </a>
      </div>
      <div className="cart-head">
        <p>PRODUCT</p>
        <p>QUANTITY</p>
        <p>TOTAL</p>
      </div>
      <hr />

      <div className="cart-items">
        {addtocart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          addtocart.map((item, index) => (
            <div className="cart-item" key={index}>
              <input
                type="checkbox"
                className="cart-checkbox"
                checked={selectedItems.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />

              <div className="product-info">
                <img src={item.image} alt={item.title} />
                <div className="product-text">
                  <p className="product-title">{item.title}</p>
                  <p className="product-price">{formatPrice(item.price)}</p>
                </div>
              </div>

              <div className="quantity-box">
                <button onClick={() => decreaseCartQty(index)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseCartQty(index)}>+</button>
                <button
                  className="delete-btn"
                  onClick={() => deleteCartItem(index)}
                >
                  <img src="/img/delete.svg" alt="Remove item" />
                </button>
              </div>

              <div className="total-price">
                {formatPrice(Number(item.price) * Number(item.quantity))}
              </div>
            </div>
          ))
        )}
      </div>
      <hr />
      <div className="subtotal-box">
        <p className="subtotal-label">Subtotal</p>
        <p className="subtotal-value">{formatPrice(subtotal)}</p>
        <button
          className="buy-now-btn"
          disabled={selectedItems.length === 0}
          onClick={() => setShowCheckout(true)}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
