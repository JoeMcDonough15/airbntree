import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";

export const getAllSpots = (spotsArr) => {
  return {
    type: GET_ALL_SPOTS,
    spotsArr,
  };
};

export const getAllSpotsThunk = () => async (dispatch) => {
  // get all the spots from server/db
  const response = await csrfFetch("/api/spots");
  const parsedResponse = await response.json();
  // extract the spots array from the parsedResponse
  const spots = parsedResponse.Spots;
  // update the redux store by dispatching the getAllSpots action
  dispatch(getAllSpots(spots));
};

const initialState = { spotsArray: [], spotsFlattened: {} };
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      // normalize the array of spots to an object of objects for O(1) retrieval of a spot
      const spotsObj = {};
      action.spotsArr.forEach((spot) => {
        spotsObj[spot.id] = spot;
      });
      // build an object that copies in state
      // overwrite the spotsFlattened property on state with our new normalized object
      // overwrite spotsArray with the action.spotsArray
      const newState = {
        ...state,
        spotsArray: action.spotsArr,
        spotsFlattened: spotsObj,
      };

      // return
      return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
