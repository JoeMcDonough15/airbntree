import SpotRating from "../SpotRating";
import NumReviews from "../NumReviews";
import "./RatingAndReviews.css";

const RatingAndReviews = ({ rating, numReviews, classes }) => {
  return (
    <div className={`rating-and-review flex-container ${classes ?? ""}`}>
      <SpotRating rating={rating} />
      <div className="circle-dot flex-container">•</div>
      <NumReviews numReviews={numReviews} />
    </div>
  );
};

export default RatingAndReviews;
