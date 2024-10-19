import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import TileImage from "../TileImage";
import SpotLocation from "../SpotLocation";
import SpotRating from "../SpotRating";
import SpotPrice from "../SpotPrice";
import Tooltip from "./Tooltip";
import "./SpotTile.css";

const SpotTile = ({ spotId }) => {
  const spot = useSelector((state) => state.spots.spotsFlattened[spotId]);
  const navigate = useNavigate();

  if (!spot) return;

  const { id, previewImage, city, state, avgRating, price, name } = spot;

  return (
    <div
      className="spot-tile flex-container col"
      onClick={() => {
        navigate(`/spots/${id}`);
      }}
    >
      <TileImage
        containerClasses="spot-preview-image"
        imageSrc={previewImage}
        imageAltText="A preview image of the spot"
      />

      <div className="location-and-rating flex-container">
        <SpotLocation city={city} state={state} abbreviateState />
        <SpotRating rating={avgRating} />
      </div>
      <SpotPrice price={price} />
      <Tooltip spotName={name} />
    </div>
  );
};

export default SpotTile;
