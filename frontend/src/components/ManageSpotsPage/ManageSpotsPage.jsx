import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsByUserThunk } from "../../store/spots";
import SpotTile from "../SpotTile";
import SpotOwnerOptions from "../SpotOwnerOptions";

const ManageSpotsPage = () => {
  const allSpotsByUser = useSelector((state) => state.spots.spotsArray);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsByUserThunk());
  }, [dispatch]);

  return (
    <section className="main-container col">
      <div className="intro-section flex-container col">
        <h1>Manage Your Spots</h1>
        <button>
          <Link to="/spots/new">Create a New Spot</Link>
        </button>
      </div>

      <div className="grid-container spots-container">
        {allSpotsByUser.map((spot) => {
          return (
            <div key={spot.id}>
              <SpotTile spotId={spot.id} />
              <SpotOwnerOptions spotId={spot.id} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ManageSpotsPage;
