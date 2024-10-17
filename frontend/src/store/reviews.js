import { csrfFetch } from "./csrf";

const GET_ALL_REVIEWS = "reviews/getAllReviews";
const SET_CURRENT_REVIEW = "reviews/setCurrentReview";
const CREATE_A_REVIEW = "reviews/createAReview";
const EDIT_A_REVIEW = "reviews/editAReview";
const DELETE_A_REVIEW = "reviews/deleteAReview";

// action creators

export const getAllReviews = (reviewsArr) => {
  return {
    type: GET_ALL_REVIEWS,
    reviewsArr,
  };
};

export const setCurrentReview = (review) => {
  return {
    type: SET_CURRENT_REVIEW,
    review,
  };
};

export const createAReview = (newReview) => {
  return {
    type: CREATE_A_REVIEW,
    newReview,
  };
};

export const editAReview = (editedReview) => {
  return {
    type: EDIT_A_REVIEW,
    editedReview,
  };
};

export const deleteAReview = (deletedReview) => {
  return {
    type: DELETE_A_REVIEW,
    deletedReview,
  };
};

// thunks

export const getAllReviewsOfASpotThunk = (spotId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const parsedResponse = await response.json();
    const allReviews = parsedResponse.Reviews;
    // dispatch the action
    dispatch(getAllReviews(allReviews));
    return allReviews;
  } catch (response) {
    const errorResponse = response.json();
    return errorResponse;
  }
};

export const getAllReviewsByUserThunk = () => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/reviews/current");
    const parsedResponse = await response.json();
    const allReviews = parsedResponse.Reviews;
    dispatch(getAllReviews(allReviews));
    return allReviews;
  } catch (response) {
    const errorResponse = response.json();
    return errorResponse;
  }
};

export const createAReviewForASpotThunk =
  (spotId, reviewObj) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewObj),
      });

      const review = await response.json();
      dispatch(createAReview(review));
      return review;
    } catch (response) {
      const parsedError = await response.json();

      return parsedError;
    }
  };

export const editAReviewThunk =
  (reviewIdToEdit, reviewObj) => async (dispatch) => {
    try {
      const response = await csrfFetch(`/api/reviews/${reviewIdToEdit}`, {
        method: "PUT",
        body: JSON.stringify(reviewObj),
      });

      const review = await response.json();
      dispatch(editAReview(review));
      return review;
    } catch (response) {
      const parsedError = await response.json();

      return parsedError;
    }
  };

export const deleteAReviewThunk = (reviewId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    const review = await response.json();
    dispatch(deleteAReview(review));
    return review;
  } catch (response) {
    const parsedError = response.json();
    return parsedError;
  }
};

// reducer

const initialState = {
  allReviews: [],
  flattenedReviews: {},
  currentReview: {},
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS: {
      const newFlattened = {};
      action.reviewsArr.forEach((review) => {
        newFlattened[review.id] = review;
      });
      const newState = {
        ...state,
        allReviews: action.reviewsArr,
        flattenedReviews: newFlattened,
        currentReview: {},
      };

      return newState;
    }

    case SET_CURRENT_REVIEW: {
      const newState = { ...state, currentReview: action.review }; // this should only ever be used when we want to populate the fields of the review modal with the contents of a review that we are about to edit
      return newState;
    }

    case CREATE_A_REVIEW: {
      const newReviewsArray = [action.newReview, ...state.allReviews];
      const newFlattened = {
        ...state.flattenedReviews,
        [action.newReview.id]: action.newReview,
      };

      const newState = {
        allReviews: newReviewsArray,
        flattenedReviews: newFlattened,
        currentReview: {}, // set currentReview to {} so that next time we go to post a review, the state of the ReviewContext is not set to the last review we submitted
      };

      return newState;
    }

    case EDIT_A_REVIEW: {
      // filter out the edited review, and then add that review to the new array that filter returns
      const newReviewsArray = state.allReviews.filter(
        (review) => review.id !== action.editedReview.id
      );
      newReviewsArray.push(action.editedReview);

      // copy flattened and then delete the one edited from flattened, then add the edited one to flattened
      const newFlattened = { ...state.flattenedReviews };
      delete newFlattened[action.editedReview.id]; // removes the old review we edited
      newFlattened[action.editedReview.id] = action.editedReview; // places the edited one into the flattenedReviews object

      const newState = {
        allReviews: newReviewsArray,
        flattenedReviews: newFlattened,
        currentReview: {}, // set currentReview to {} so that next time we go to post a review, the state of the ReviewContext is not set to the last review we submitted
      };

      return newState;
    }

    case DELETE_A_REVIEW: {
      const newReviewsArray = state.allReviews.filter(
        (review) => review.id !== action.deletedReview.id
      );
      const newFlattened = { ...state.flattenedReviews };
      delete newFlattened[action.deletedReview.id];

      const newState = {
        allReviews: newReviewsArray,
        flattenedReviews: newFlattened,
        currentReview: {},
      };

      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
