import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OpenModalController from "../OpenModalController";
import ReviewFormModal from "../ReviewFormModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const Review = ({ id }) => {
  const currentUser = useSelector((state) => state.session.user); // null if no user is logged in
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails); // {} on first render
  const currentReview = useSelector(
    (state) => state.reviews.flattenedReviews[id]
  ); // undefined on first render, then an object

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const dateString = currentReview?.createdAt;

    if (!dateString) return;

    const monthAndYear = dateString.split(" ")[0].split("-");

    const monthMap = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    setMonth(monthMap[monthAndYear[1]]);
    setYear(monthAndYear[0]);
  }, [setMonth, setYear, currentReview]);

  return (
    <div className="col">
      <h2>{currentReview?.User?.firstName}</h2>
      <p>{`${month} ${year}`}</p>
      <p>{currentReview?.review}</p>
      {currentReview && currentUser?.id === currentReview?.userId && (
        <>
          <OpenModalController
            controllerText="Update Your Review"
            elementName="button"
            modalComponent={
              <ReviewFormModal
                spotName={currentSpot.name}
                reviewObj={currentReview}
              />
            }
          />
          <OpenModalController
            controllerText="Delete Your Review"
            elementName="button"
            modalComponent={
              <DeleteConfirmationModal
                confirmationMessage="custom message here"
                subjectType="review"
                subjectId={currentReview?.id}
              />
            }
          />
        </>
      )}
    </div>
  );
};

export default Review;
