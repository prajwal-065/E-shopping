import React, { useContext, useState } from "react";
import ProductList from "./ProductList";
import { inputText } from "../App";

const Header = () => {
  const [showSearch, setShowSearch] = useState("d-none");

  const { filterValue, setFilterValue, handleCart, addtocart } =
    useContext(inputText);

  const handleShowSearch = () => {
    setShowSearch("");
  };

  const totalQty = addtocart.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  return (
    <div className="header">
      <div className="logo">
        <a href=" ">
          <img src="/img/Logo.svg" alt="Company logo" />
        </a>
      </div>

      <div className="search">
        <button id="search-btn" onClick={handleShowSearch}>
          <span className="search-in">
            <input
              type="text"
              value={filterValue}
              id="myInput"
              placeholder="search"
              className={showSearch}
              onChange={(e) => {
                setFilterValue(e.target.value);
              }}
            />
            <img src="/img/search.svg" alt="" width="60px" height="60px" />
          </span>
        </button>

        <button id="cart-btn">
          <div className="cart-icon" onClick={handleCart}>
            <img src="/img/cart.svg" alt="" width="70" height="70" />

            {totalQty > 0 && (
              <span id="cart-badge" className="cart-badge">
                {totalQty}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
