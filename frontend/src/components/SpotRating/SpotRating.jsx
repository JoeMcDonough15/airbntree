import { FaStar } from "react-icons/fa6";

const SpotRating = ({ rating }) => {
  if (rating && !rating.toString().includes(".")) {
    rating += ".0";
  }
  return (
    <>
      <div className="rating">
        <FaStar />
      </div>
      <span>{rating}</span>
    </>
  );
};

export default SpotRating;
