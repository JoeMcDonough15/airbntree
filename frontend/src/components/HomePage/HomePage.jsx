import { getAllSpotsThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpotTile from "./SpotTile";
import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spotsArray);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="grid-container spots-container">
        {allSpots.map((spot) => {
          return <SpotTile key={spot.id} spotId={spot.id} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
