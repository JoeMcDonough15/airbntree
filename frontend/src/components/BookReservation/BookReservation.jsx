import SpotPrice from "../SpotPrice";
import SpotRating from "../SpotRating";
import NumReviews from "../NumReviews";
import "./BookReservation.css";

const BookReservation = ({ price, rating, numReviews }) => {
  return (
    <div className="reservations-container">
      <div className="flex-container reservation-spot-details">
        <SpotPrice price={price} />
        <div className="right-side flex-container">
          <SpotRating rating={rating} />
          <NumReviews numReviews={numReviews} />
        </div>
      </div>
      <button
        onClick={() => {
          window.alert("Feature coming soon");
        }}
        className="full-width-button active-button"
      >
        Reserve
      </button>
    </div>
  );
};

export default BookReservation;
