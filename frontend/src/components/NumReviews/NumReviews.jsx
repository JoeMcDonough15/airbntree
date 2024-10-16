const NumReviews = ({ numReviews }) => {
  let text;

  if (numReviews === 1) {
    text = "review";
  } else {
    text = "reviews";
  }

  return (
    <p>
      {numReviews} {text}
    </p>
  );
};

export default NumReviews;
