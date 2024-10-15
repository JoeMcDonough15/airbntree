import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSpotsByUserThunk } from "../../store/spots";
import SpotTile from "../SpotTile";
import SpotOwnerOptions from "../SpotOwnerOptions";

const ManageSpotsPage = () => {
  const allSpotsByUser = useSelector((state) => state.spots.spotsByCurrentUser);
  console.log("all spots by user: ", allSpotsByUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSpotsByUserThunk());
  }, [dispatch]);

  return (
    <section className="main-container col">
      <div className="intro-section flex-container col">
        <h1>Manage Your Spots</h1>
        <button>Create a New Spot</button>
      </div>

      <SpotOwnerOptions spotId={6} />
      {console.log("outside map: ", 6, typeof 6)}

      <div className="grid-container spots-container">
        {allSpotsByUser.map((spot) => {
          console.log(
            spot.id,
            " inside map over allSpotsByUser",
            typeof spot.id
          );
          return (
            <div key={spot.id}>
              <SpotTile spotId={spot.id}></SpotTile>
              <SpotOwnerOptions spotId={spot.id} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ManageSpotsPage;
