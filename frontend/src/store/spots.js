import { csrfFetch } from "./csrf";

const GET_ALL_SPOTS = "spots/getAllSpots";
const GET_SPOT_DETAILS = "spots/getSpotDetails";
const GET_ALL_SPOTS_BY_USER = "spots/getAllSpotsByUser";
const ADD_NEW_SPOT = "spots/addNewSpot";
const DELETE_SPOT_IMAGE = "spots/deleteSpotImage";
const ADD_SPOT_IMAGE = "spots/addSpotImage";

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

export const getAllSpotsByUser = (spotsArr) => {
  return {
    type: GET_ALL_SPOTS_BY_USER,
    spotsArr,
  };
};

export const addNewSpot = (newSpot) => {
  return {
    type: ADD_NEW_SPOT,
    newSpot,
  };
};

export const deleteSpotImage = (spotId, deletedImage) => {
  return {
    type: DELETE_SPOT_IMAGE,
    imageData: { spotId, deletedImage },
  };
};

export const addSpotImage = (spotId, newImage) => {
  return {
    type: ADD_SPOT_IMAGE,
    imageData: { spotId, newImage },
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

export const getAllSpotsByUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  const parsedResponse = await response.json();
  const spots = parsedResponse.Spots;

  dispatch(getAllSpotsByUser(spots));

  return spots;
};

export const createNewSpotThunk = (spotDetails) => async (dispatch) => {
  // in case there are any server side errors with validation, use a try/catch block
  try {
    // talk to the server and offer up this new spot
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(spotDetails),
    });
    const newSpot = await response.json();
    // dispatch an action to update our redux store
    dispatch(addNewSpot(newSpot));
    // return the spot back to the SpotForm component from where we submitted this request
    return newSpot;
  } catch (response) {
    const errorResponse = response.json();
    // return the error response back to the SpotForm component from where we submitted this request
    return errorResponse;
  }
};

export const addImageToSpotThunk = (spotId, imageData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      body: JSON.stringify(imageData),
    });
    const newImage = await response.json();
    dispatch(addSpotImage(spotId, newImage));
    return newImage;
  } catch (response) {
    const errorResponse = await response.json();
    console.log("error response from addImageSpotThunk: ", errorResponse);
  }
};

export const deleteSpotImageThunk = (spotId, imageData) => async (dispatch) => {
  const response = await csrfFetch(`/api/spot-images/${imageData.id}`, {
    method: "DELETE",
  });
  const parsedResponse = await response.json();
  console.log(
    "parsedResponse when deleting an image from a spot: ",
    parsedResponse
  );
  dispatch(deleteSpotImage(spotId, imageData));
};

const initialState = {
  spotsArray: [],
  spotsFlattened: {},
  spotsByCurrentUser: [],
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

    case GET_ALL_SPOTS_BY_USER: {
      const spotsObj = {};
      action.spotsArr.forEach((spot) => {
        spotsObj[spot.id] = spot;
      });
      const newState = {
        ...state,
        spotsByCurrentUser: action.spotsArr,
        spotsFlattened: spotsObj,
      };
      return newState;
    }

    case ADD_NEW_SPOT: {
      const newState = { ...state }; // whatever the state is currently; this can be impacted by refreshing and by navigating to different pages that dispatch different thunks/actions on mount
      // the new spot won't have all the same data that the others do.  The route GET api/spots returns previewImage and avgRating properties that the POST api/spots does not.
      newState.spotsArray = [...newState.spotsArray, action.newSpot];
      newState.spotsFlattened = {
        ...newState.spotsFlattened,
        [action.newSpot.id]: action.newSpot,
      };

      return newState;
    }

    case ADD_SPOT_IMAGE: {
      const newState = { ...state };
      const { spotId, newImage } = action.imageData;
      if (newImage.preview) {
        // then also add this image's url to the correct spot in spotsArray as previewImage
        newState.spotsArray = newState.spotsArray.map((spotObj) => {
          if (spotObj.id === spotId) {
            spotObj.previewImage = newImage.url;
          }
          return spotObj;
        });
      }

      // ! do not set newState.currentSpotDetails here because we don't have all the details.  We'd need to dispatch the action GET_SPOT_DETAILS to have what we need for that object.  Creating or editing a spot and adding new images does not give us all the details we'd need for the currentSpotDetails object.
      // finally, add the new image to currentSpotDetails before we update the state
      // newState.currentSpotDetails.SpotImages = [
      //   ...newState.currentSpotDetails.SpotImages,
      //   newImage,
      // ];

      // update the state of spots
      return newState;
    }

    case DELETE_SPOT_IMAGE: {
      // shallow copy the state object
      const newState = { ...state };
      const { spotId, deletedImage } = action.imageData;
      // if the image we're deleting is the preview image for any one of the
      if (deletedImage.preview) {
        // then also remove it from spotsArray
        newState.spotsArray.forEach((spotObj) => {
          if (spotObj.previewImage === deletedImage.url) {
            delete spotObj.previewImage;
          }
        });
        // and remove it from the flattened spots object // ? Do I have to do this since the spotsArray points to the same objects that are in spotsFlattened?
        delete newState.spotsFlattened[spotId].previewImage;
      }

      // ! do not set newState.currentSpotDetails here because we don't have all the details.  We'd need to dispatch the action GET_SPOT_DETAILS to have what we need for that object.  Creating or editing a spot and deleting images does not give us all the details we'd need for the currentSpotDetails object.
      // whether it's the previewImage or not, we have to remove the image from currentSpotDetails because that property of newState contains every image that belongs to the spot, including the one we're deleting!
      // const spotImages = newState.currentSpotDetails.SpotImages;
      // newState.currentSpotDetails.SpotImages = [
      //   ...spotImages.filter((image) => image.id !== deletedImage.id),
      // ];

      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
