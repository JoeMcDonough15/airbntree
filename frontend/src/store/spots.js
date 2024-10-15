import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const ADD_NEW_SPOT = "spots/addNewSpot";

export const getAllSpots = (spotsArr) => {
  return {
    type: GET_ALL_SPOTS,
    spotsArr,
  };
};

export const getSpotDetails = (spotDetails) => {
  return {
    type: GET_SPOT_DETAILS,
    spotDetails,
  };
};

export const addNewSpot = (newSpot) => {
  return {
    type: ADD_NEW_SPOT,
    newSpot,
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

export const getSpotDetailsThunk = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spotDetails = await response.json();
  dispatch(getSpotDetails(spotDetails));
  return spotDetails;
};

export const createNewSpotThunk = (spotDetails) => async (dispatch) => {
  // in case there are any server side errors with validation, use a try/catch block
  try {
    // talk to the server and offer up this new spot
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(spotDetails),
    });
    const newSpot = await response.json(); // ! Is the data we want nested inside the parsed response?
    // dispatch an action to update our redux store
    dispatch(addNewSpot(newSpot));
    // return the spot back to the SpotForm component from where we submitted this request
    return newSpot;
  } catch (response) {
    const errorResponse = response.json();
    console.log("response inside catch blocK : ", errorResponse);
    // return the error response back to the SpotForm component from where we submitted this request
    return errorResponse;
  }
};

const initialState = {
  spotsArray: [],
  spotsFlattened: {},
  currentSpotDetails: {},
};
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

      return newState;
    }

    case GET_SPOT_DETAILS: {
      const newState = { ...state, currentSpotDetails: action.spotDetails };
      return newState;
    }

    case ADD_NEW_SPOT: {
      const newState = {
        ...state,
        spotsArray: [...state.spotsArray, action.newSpot],
        spotsFlattened: {
          ...state.spotsFlattened,
          [action.newSpot.id]: action.newSpot,
        },
        currentSpotDetails: action.newSpot,
      };
      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
