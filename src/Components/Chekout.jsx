import React, { useContext } from "react";
import { inputText } from "../App";

const Checkout = () => {
  const {
    addtocart,
    selectedItems,
    setShowCheckout,
    setAddtoCart,
    buyNowItem,
    setBuyNowItem,
  } = useContext(inputText);

  const itemsToPay = buyNowItem
    ? [buyNowItem]
    : addtocart.filter((_, index) => selectedItems.includes(index));

  const grandTotal = itemsToPay.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePayNow = () => {
    alert("✅ Payment Successful");

    if (buyNowItem) {
      setBuyNowItem(null);
    } else {
      setAddtoCart((prev) =>
        prev.filter((_, index) => !selectedItems.includes(index)),
      );
    }

    setShowCheckout(false);
  };

  return (
    <div className="payment-container">
      <h2>Order Summary</h2>

      {itemsToPay.map((item, index) => (
        <div key={index} className="payment-row">
          <p>{item.title}</p>
          <p>Qty: {item.quantity}</p>
          <p>${item.price * item.quantity}</p>
        </div>
      ))}

      <h3>Total Amount: ${grandTotal}</h3>

      <button onClick={handlePayNow} className="pay-now-btn">
        Pay Now
      </button>
      <button onClick={() => setShowCheckout(false)} className="pay-now-btn">
        Back to Cart
      </button>
    </div>
  );
};

export default Checkout;
