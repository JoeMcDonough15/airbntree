import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSpotDetailsThunk } from "../../store/spots";
import { useEffect } from "react";
import SpotLocation from "../SpotLocation";
import BookReservation from "../BookReservation";
import Gallery from "../Gallery";
import SpotReviewsSection from "../SpotReviewsSection";

import "./SpotDetailsPage.css";

const SpotDetailsPage = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots.currentSpotDetails); // {} when component first mounts

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotDetailsThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <section className="flex-container main-container spot-details-container col">
      <h1>{spot?.name}</h1>
      <SpotLocation
        city={spot?.city}
        state={spot?.state}
        country={spot?.country}
      />

      <Gallery />
      <div className="details-and-reserve flex-container">
        <div className="host-and-description">
          <p>
            Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}
          </p>
          <p>{spot?.description}</p>
        </div>
        <BookReservation price={spot?.price} />
      </div>

      <SpotReviewsSection />
    </section>
  );
};

export default SpotDetailsPage;
