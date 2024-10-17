import RatingAndReviews from "../RatingAndReviews";
import Review from "./Review";
import { useSelector } from "react-redux";
import OpenModalController from "../OpenModalController";
import ReviewFormModal from "../ReviewFormModal";

const SpotReviewsSection = ({ reviewsArray, rating, numReviews }) => {
  const userId = useSelector((state) => state.session.user?.id);
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails);

  return (
    <section>
      <RatingAndReviews rating={rating} numReviews={numReviews} />
      {userId && currentSpot.id && userId !== currentSpot.ownerId && (
        <OpenModalController
          controllerText="Post Your Review"
          elementName="button"
          modalComponent={<ReviewFormModal />}
        />
      )}
      <>
        {reviewsArray.length > 0 ? (
          <>
            {reviewsArray.map((reviewObj, index) => {
              return (
                <Review
                  key={index}
                  spotName={currentSpot.name}
                  reviewObj={reviewObj}
                />
              );
            })}
          </>
        ) : (
          <>
            {userId && currentSpot.id && userId !== currentSpot.id && (
              <p>Be the first to post a review!</p>
            )}
          </>
        )}
      </>
    </section>
  );
};

export default SpotReviewsSection;
