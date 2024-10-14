import { FaStar } from "react-icons/fa6";
import "./SpotRating.css";

const SpotRating = ({ rating }) => {
  if (rating && !rating.toString().includes(".")) {
    rating += ".0";
  }
  return (
    <>
      <div className="rating flex-container">
        <div className="icon-container">
          <FaStar />
        </div>
        <span>{rating ? rating : "New"}</span>
      </div>
    </>
  );
};

export default SpotRating;
