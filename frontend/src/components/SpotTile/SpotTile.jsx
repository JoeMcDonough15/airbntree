import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TileImage from "../TileImage";
import SpotLocation from "../SpotLocation";
import SpotRating from "../SpotRating";
import SpotPrice from "../SpotPrice";
import "./SpotTile.css";

const SpotTile = ({ spotId, children }) => {
  const spot = useSelector((state) => state.spots.spotsFlattened[spotId]);
  const navigate = useNavigate();

  return (
    <div
      className="spot-tile flex-container col"
      onClick={() => {
        navigate(`/spots/${spot.id}`);
      }}
    >
      <TileImage
        imageSrc={spot.previewImage}
        imageAltText="A preview image of the spot"
      />
      <div className="location-and-rating flex-container">
        <SpotLocation city={spot.city} state={spot.state} />
        <SpotRating rating={spot.avgRating} />
      </div>
      <SpotPrice price={spot.price} />
      {children}
    </div>
  );
};

export default SpotTile;
