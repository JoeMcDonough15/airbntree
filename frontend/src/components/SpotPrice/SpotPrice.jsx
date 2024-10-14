import fixPrice from "./fixPrice";
import "./SpotPrice.css";

const SpotPrice = ({ price }) => {
  price = fixPrice(price);
  return (
    <p>
      {" "}
      <span className="price">{price}</span> night
    </p>
  );
};

export default SpotPrice;
