import Header from "./Components/Header";
import Content2 from "./Components/Content2";
import Content1 from "./Components/Content1";
import { createContext, useEffect, useState } from "react";

export const inputText = createContext();

const App = () => {
  const [filterValue, setFilterValue] = useState("");

  const [productClicked, setProductClicked] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState("");

  const [currency, setCurrency] = useState("CAD");

  const [showcart, setShowCart] = useState(false);

  const [addtocart, setAddtoCart] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const handleClicked = (singleProduct) => {
    setProductClicked(!productClicked);
    setSelectedProduct(singleProduct);
  };

  const handleBack = () => {
    setProductClicked(!productClicked);
  };

  const handleCart = () => {
    setShowCart((prev) => !prev);
  };

  const updatecartitem = (addItem) => {
    setAddtoCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === addItem.id);

      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? {
                ...item,
                quantity: item.quantity + addItem.quantity,
              }
            : item,
        );
      }
      return [...prev, addItem];
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(addtocart));
  }, [addtocart]);

  // INCREMENT quantity
  const decreaseCartQty = (index) => {
    setAddtoCart((prev) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item,
      ),
    );
  };

  // DECREMENT quantity
  const increaseCartQty = (index) => {
    setAddtoCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // DELETE item
  const deleteCartItem = (index) => {
    setAddtoCart((prev) => prev.filter((_, i) => i !== index));
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const [buyNowItem, setBuyNowItem] = useState(null);

  /**
   * Converts a base CAD price to the selected currency for display.
   * @param {number} value - The price to convert.
   * @returns {number} The converted price value.
   */
  const convertPrice = (value) => {
    const rates = { CAD: 1, USD: 0.74 };
    return value * (rates[currency] || 1);
  };

  /**
   * Formats a numeric price based on the selected currency.
   * @param {number} value - The price value to format.
   * @returns {string} A display-ready price string.
   */
  const formatPrice = (value) => {
    const convertedValue = convertPrice(Number(value || 0));

    if (currency === "USD") {
      return `$${convertedValue.toFixed(2)} USD`;
    }

    return `$${convertedValue.toFixed(2)} CAD`;
  };

  return (
    <inputText.Provider
      value={{
        filterValue,
        setFilterValue,
        productClicked,
        setProductClicked,
        handleClicked,
        selectedProduct,
        setSelectedProduct,
        handleBack,
        handleCart,
        showcart,
        setShowCart,
        updatecartitem,
        setAddtoCart,
        addtocart,
        increaseCartQty,
        decreaseCartQty,
        deleteCartItem,
        showCheckout,
        setShowCheckout,
        selectedItems,
        setSelectedItems,
        buyNowItem,
        setBuyNowItem,
        currency,
        setCurrency,
        formatPrice,
      }}
    >
      <div className="  ">
        <Header />
        <Content2 />
        <hr />
        <Content1 />
      </div>
    </inputText.Provider>
  );
};
export default App;
