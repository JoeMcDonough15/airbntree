import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OpenModalController from "../OpenModalController";
import ReviewFormModal from "../ReviewFormModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const Review = ({ currentReview }) => {
  const { spotId } = useParams(); // for use when rendering the h2 of the Review component
  const currentUser = useSelector((state) => state.session.user); // null if no user is logged in
  const flattenedSpots = useSelector((state) => state.spots.spotsFlattened); // possibly an empty {}
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

  /* even though currentReview is passed in as a prop, that prop depends on a useEffect so we still need conditional chaining */
  return (
    <div className="col">
      {/* useParams tells us the location where this component is rendering, so !spotId tells us we are on the ManageReviewsPage */}
      <h2>
        {!spotId
          ? flattenedSpots[currentReview?.spotId]?.name
          : currentReview?.User?.firstName}
      </h2>
      <p>{`${month} ${year}`}</p>
      <p>{currentReview?.review}</p>
      {currentReview && currentUser?.id === currentReview?.userId && (
        <>
          <OpenModalController
            controllerText="Update Your Review"
            elementName="button"
            modalComponent={
              <ReviewFormModal
                spotName={flattenedSpots[currentReview?.spotId]?.name}
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
