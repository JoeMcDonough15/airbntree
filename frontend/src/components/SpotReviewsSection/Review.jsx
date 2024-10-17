import { useSelector } from "react-redux";
import OpenModalController from "../OpenModalController";
import ReviewFormModal from "../ReviewFormModal";

// ! be sure that review is truthy before returning any jsx

const Review = ({ spotName, reviewObj }) => {
  const currentUserId = useSelector((state) => state.session.user.id);

  const {
    User: { firstName },
    createdAt,
    review,
    id: reviewId,
  } = reviewObj;

  const monthAndYear = createdAt.split(" ")[0].split("-");

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

  const month = monthMap[monthAndYear[1]];
  const year = monthAndYear[0];

  return (
    <div className="col">
      <h2>{firstName}</h2>
      <p>{`${month} ${year}`}</p>
      <p>{review}</p>
      {currentUserId === reviewId && (
        <OpenModalController
          controllerText="Update Your Review"
          elementName="button"
          modalComponent={
            <ReviewFormModal
              headerText={`How was your stay at ${spotName}?`}
              reviewObj={reviewObj}
            />
          }
        />
      )}
    </div>
  );
};

export default Review;
