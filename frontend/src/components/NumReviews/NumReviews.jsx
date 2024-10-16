import "./NumReviews.css";

const NumReviews = ({ numReviews }) => {
  let text;

  if (numReviews === 1) {
    text = "review";
  } else {
    text = "reviews";
  }

  return (
    <p className="flex-container num-reviews-texxt">
      <span>{numReviews}</span>
      <span>{text}</span>
    </p>
  );
};

export default NumReviews;
