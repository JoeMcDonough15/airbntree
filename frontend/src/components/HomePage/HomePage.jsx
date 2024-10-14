import { useNavigate } from "react-router-dom";
import { getAllSpotsThunk } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allSpots = useSelector((state) => state.spots.spotsArray);

  useEffect(() => {
    dispatch(getAllSpotsThunk());
  }, [dispatch]);

  return (
    <>
      <div className="spots-container">
        {allSpots.map((spot) => {
          return (
            <div
              onClick={() => {
                navigate(`/spots/${spot.id}`);
              }}
              key={spot.id}
            >
              {spot.id}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
