import { useContext, useState } from "react";
import { inputText } from "../App";

const ProductCard = ({ product }) => {
  const [img, setImg] = useState(product.image);

  const { handleClicked, formatPrice } = useContext(inputText);

  return (
    <div
      className="card"
      onClick={() => {
        handleClicked(product);
      }}
    >
      <div className="image-box">
        <img
          src={img}
          alt={product.title}
          onMouseEnter={() => setImg(product.hoverImage)}
          onMouseLeave={() => setImg(product.image)}
        />
      </div>

      <p className="title">{product.title}</p>
      <p className="price">{formatPrice(product.priceValue)}</p>
    </div>
  );
};

export default ProductCard;
