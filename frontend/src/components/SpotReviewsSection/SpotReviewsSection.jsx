import RatingAndReviews from "../RatingAndReviews";
import Review from "./Review";
import { useSelector } from "react-redux";
import LeaveAReviewButton from "./LeaveAReviewButton";

const SpotReviewsSection = ({ reviewsArray, rating, numReviews }) => {
  const userId = useSelector((state) => state.session.user?.id);
  const spotOwnerId = useSelector(
    (state) => state.spots.currentSpotDetails?.ownerId
  );

  return (
    <section>
      <RatingAndReviews rating={rating} numReviews={numReviews} />
      {userId && userId !== spotOwnerId && <LeaveAReviewButton />}
      <>
        {reviewsArray.length > 0 ? (
          <>
            {reviewsArray.map((reviewObj, index) => {
              return <Review key={index} reviewObj={reviewObj} />;
            })}
          </>
        ) : (
          <>
            {userId && userId !== spotOwnerId && (
              <p>Be the first to post a review!</p>
            )}
          </>
        )}
      </>
    </section>
  );
};

export default SpotReviewsSection;
