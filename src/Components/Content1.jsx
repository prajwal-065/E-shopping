import React, { useContext } from "react";
import { inputText } from "../App";

const Content1 = () => {
  const { currency, setCurrency } = useContext(inputText);

  return (
    <div className="content">
      <div className="cont-1">
        <img src="/img/logo-small.avif" alt="" />
        <p className="strive">
          A brand that strives to inspire and push creative culture forward.
        </p>
        <p className="strive-2">
          We approach our work with the mentality that every product made is a
          learning experience to improve our craft. We are practitioners and
          purveyors of creative culture and are inspired by its various forms
          from art, design, fashion, music, film, food, and more.
        </p>
      </div>
      <div className="cont-2">
        <a>
          <img src="/img/facebook-svgrepo-com.svg" alt="" />
        </a>
        <a>
          <img src="/img/instagram-svgrepo-com.svg" alt="" />
        </a>
        <a>
          <img src="/img/twitter-svgrepo-com.svg" alt="" />
        </a>
        <a>
          <img src="/img/youtube-168-svgrepo-com.svg" alt="" />
        </a>
        <a>
          <img src="/img/tiktok-fill-svgrepo-com.svg" alt="" />
        </a>
      </div>
      <hr />
      <div className="payment">
        <div className="pay-1">
          <p>Country/region</p>
          <select
            name="covert"
            id="convert"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            <option value="CAD">Canada (CAD $)</option>
            <option value="USD">United States (USD $)</option>
          </select>
        </div>
        <div className="cont-2">
          <a>
            <img src="/img/americanExpress.svg" alt="" />
          </a>
          <a>
            <img src="/img/paypal.svg" alt="" />
          </a>
          <a>
            <img src="/img/applePay.svg" alt="" />
          </a>
          <a>
            <img src="/img/visa.svg" alt="" />
          </a>
          <a>
            <img src="/img/mastercard.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Content1;
