import ReviewsSection from "../ReviewsSection";
import { useSelector, useDispatch } from "react-redux";
import { getAllReviewsByUserThunk } from "../../store/reviews";
import { useEffect } from "react";

const ManageReviewsPage = () => {
  const userId = useSelector((state) => state.session.user.id);
  const allReviewsByUser = useSelector((state) => state.reviews.allReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReviewsByUserThunk(userId));
  }, [dispatch, userId]);

  return (
    <section className="main-container">
      {" "}
      <h1>Manage Reviews</h1>
      <ReviewsSection reviewsArr={allReviewsByUser} />{" "}
    </section>
  );
};

export default ManageReviewsPage;
