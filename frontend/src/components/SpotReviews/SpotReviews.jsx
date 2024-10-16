import RatingAndReviews from "../RatingAndReviews";

const SpotReviews = ({ reviewsArray, rating, numReviews }) => {
  return (
    <div>
      <RatingAndReviews rating={rating} numReviews={numReviews} />
      {reviewsArray.map((reviewObj, index) => {
        const { review } = reviewObj;
        return <div key={index}>{review && <h1>{review}</h1>}</div>;
      })}
    </div>
  );
};

export default SpotReviews;
