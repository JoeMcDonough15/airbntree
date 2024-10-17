import { useReviewFormContext } from "../../context/ReviewFormContext";
// import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { setCurrentReview } from "../../store/reviews";
import ReviewForm from "../ReviewForm";

const ReviewFormModal = ({ spotName, reviewObj }) => {
  //   const currentReview = useSelector((state) => state.reviews.currentReview);
  //   const dispatch = useDispatch();
  const {
    setReviewText,
    setStarRating,
    setButtonDisabled,
    setUserErrors,
    setButtonText,
  } = useReviewFormContext();

  //   if (reviewObj) {
  //     setReviewText(reviewObj.review);
  //     setStarRating(reviewObj.stars);
  //     setButtonDisabled(false);
  //     setUserErrors({});
  //     setButtonText("Update Your Review");
  //   }

  useEffect(() => {
    // reset any errors
    setUserErrors({});

    if (!reviewObj) {
      setReviewText("");
      setStarRating(5); // ! set to 5 for testing
      setButtonDisabled(true);
      setButtonText("Submit");
      return;
    }
    setReviewText(reviewObj.review);
    setStarRating(reviewObj.stars);
    setButtonDisabled(false);
    setUserErrors({});
    setButtonText("Update");

    // dispatch(setCurrentReview(reviewObj)).then((reviewToEdit) => {
    //   const { review, stars } = reviewToEdit;
    //   setReviewText(review);
    //   setStarRating(stars);
    //   setButtonDisabled(false); // if the review was already in the database, it is valid to start
    //   setButtonText("Update");
    // });
  }, [
    // dispatch,
    reviewObj,
    setReviewText,
    setStarRating,
    setButtonDisabled,
    setButtonText,
    setUserErrors,
  ]);

  // initialize the state of the form based on whether or not we are updating an existing review

  return (
    <section className="modal-container">
      <h2>{`How was your stay${spotName ? ` at ${spotName}` : ""}?`}</h2>
      <ReviewForm reviewToEdit={reviewObj} />;
    </section>
  );
};

export default ReviewFormModal;
