import SpotPrice from "../SpotPrice";
import RatingAndReviews from "../RatingAndReviews";
import "./BookReservation.css";

const BookReservation = ({ price }) => {
  return (
    <div className="reservations-container">
      <div className="flex-container reservation-spot-details">
        <SpotPrice price={price} />
        <RatingAndReviews />
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
