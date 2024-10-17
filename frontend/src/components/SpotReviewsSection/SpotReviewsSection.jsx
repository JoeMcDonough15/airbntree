import RatingAndReviews from "../RatingAndReviews";
import Review from "./Review";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllReviewsOfASpotThunk } from "../../store/reviews";
import OpenModalController from "../OpenModalController";
import ReviewFormModal from "../ReviewFormModal";

const SpotReviewsSection = () => {
  const userId = useSelector((state) => state.session.user?.id); // undefined when component first mounts
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails); // {} when component first mounts
  const reviewsForCurrentSpot = useSelector(
    (state) => state.reviews.allReviews
  ); // [] when component first mounts
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentSpot.id) return;
    dispatch(getAllReviewsOfASpotThunk(currentSpot.id));
  }, [dispatch, currentSpot]);

  // verification functions

  const spotBelongsToCurrentUser = (userId, ownerId) => {
    return userId === ownerId;
  };

  const userHasReviewedThisSpot = (userId) => {
    return reviewsForCurrentSpot.some((spotReview) => {
      return spotReview.userId === userId;
    });
  };

  return (
    <section>
      <RatingAndReviews />
      {userId &&
        !spotBelongsToCurrentUser(userId, currentSpot.ownerId) &&
        !userHasReviewedThisSpot(userId) && (
          <OpenModalController
            controllerText="Post Your Review"
            elementName="button"
            modalComponent={<ReviewFormModal />}
          />
        )}
      <>
        {reviewsForCurrentSpot.length > 0 ? (
          <>
            {reviewsForCurrentSpot.map((review) => {
              return <Review key={review.id} id={review.id} />;
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
