import Review from "./Review";

const ReviewsSection = ({ reviewsArr }) => {
  return (
    <>
      {reviewsArr.map((review) => {
        return <Review key={review.id} currentReview={review} />;
      })}
    </>
  );
};

export default ReviewsSection;
