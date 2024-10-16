import SpotRating from "../SpotRating";
import NumReviews from "../NumReviews";
import "./RatingAndReviews.css";

const RatingAndReviews = ({ rating, numReviews }) => {
  return (
    <div className={"rating-and-review flex-container"}>
      <SpotRating rating={rating} />
      {numReviews > 0 && (
        <>
          <div className="circle-dot flex-container">•</div>
          <NumReviews numReviews={numReviews} />
        </>
      )}
    </div>
  );
};

export default RatingAndReviews;
