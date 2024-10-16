import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotDetailsThunk } from "../../store/spots";
import { useEffect } from "react";
import SpotLocation from "../SpotLocation";
import BookReservation from "../BookReservation";
import Gallery from "../Gallery";
import SpotReviews from "../SpotReviews";

import "./SpotDetailsPage.css";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.currentSpotDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  if (Object.values(spot).length === 0) {
    return;
  }

  const {
    name,
    city,
    state,
    country,
    Owner: { firstName, lastName },
    SpotImages,
    Reviews,
    price,
    avgStarRating,
    description,
    numReviews,
  } = spot;
  // ! every property we pull out of spot will possibly be undefined on the first render of this component

  console.log("reviews: ", Reviews);

  return (
    <section className="flex-container main-container spot-details-container col">
      <h1>{name}</h1>
      <SpotLocation city={city} state={state} country={country} stateFullName />
      {SpotImages && <Gallery imagesArr={SpotImages} />}
      <div className="details-and-reserve flex-container">
        <div className="host-and-description">
          <p>
            Hosted by {firstName} {lastName}
          </p>
          <p>{description}</p>
        </div>
        <BookReservation
          price={price}
          rating={avgStarRating}
          numReviews={numReviews}
        />
      </div>
      {Reviews && (
        <SpotReviews
          reviewsArray={Reviews}
          rating={avgStarRating}
          numReviews={numReviews}
        />
      )}
    </section>
  );
};

export default SpotDetailsPage;
