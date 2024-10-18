import fixPrice from "./fixPrice";
import "./SpotPrice.css";

const SpotPrice = ({ price }) => {
  const fixedPrice = fixPrice(price);
  return (
    <p>
      <span className="price">{fixedPrice}</span> night
    </p>
  );
};

export default SpotPrice;
