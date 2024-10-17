import RatingAndReviews from "../RatingAndReviews";
import Review from "./Review";
import { useSelector } from "react-redux";
import OpenModalController from "../OpenModalController";
import ReviewFormModal from "../ReviewFormModal";

const SpotReviewsSection = () => {
  const userId = useSelector((state) => state.session.user?.id);
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails);
  const reviewsForCurrentSpot = useSelector(
    (state) => state.reviews.allReviews
  ); // [] when component first mounts

  return (
    <section>
      <RatingAndReviews />
      {userId && currentSpot?.id && userId !== currentSpot?.ownerId && (
        <OpenModalController
          controllerText="Post Your Review"
          elementName="button"
          modalComponent={<ReviewFormModal />}
        />
      )}
      <>
        {reviewsForCurrentSpot.length > 0 ? (
          <>
            {reviewsForCurrentSpot.map((reviewObj, index) => {
              return <Review key={index} reviewObj={reviewObj} />;
            })}
          </>
        ) : (
          <>
            {userId && currentSpot?.id && userId !== currentSpot?.id && (
              <p>Be the first to post a review!</p>
            )}
          </>
        )}
      </>
    </section>
  );
};

export default SpotReviewsSection;
