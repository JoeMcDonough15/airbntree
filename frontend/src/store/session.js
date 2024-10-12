import { csrfFetch } from "./csrf";

const LOGIN_USER = "session/login";
const LOGOUT_USER = "session/logout";
const RESTORE_USER = "session/userLoggedIn";

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const restoreUser = (user) => {
  return {
    type: RESTORE_USER,
    user,
  };
};

export const loginUserThunk = (userCredentials) => async (dispatch) => {
  try {
    // talk to the API to log in a user to set our third token, the JWT token, thus logging a user in.  After logging a user in, we should have a _csrf token, an XSRF-TOKEN, and a JWT Token (just called token) in the browser's cookies.
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential: userCredentials.credential,
        password: userCredentials.password,
      }),
    }); // headers will be set from within csrfFetch(), as it is defined to use the XSRF-TOKEN that will be retrieved from cookies, as well as set the 'Content-Type' to 'application/json.
    const parsedResponse = await response.json(); // after parsing, it looks like: { user: { id, email, username, firstName, lastName } }
    const user = parsedResponse.user; //  an object with user details properties
    dispatch(loginUser(user));
    return user;
  } catch (errorResponse) {
    const error = await errorResponse.json();
    return error;
  }
};

export const logoutUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", { method: "DELETE" });
  const message = await response.json();
  dispatch(logoutUser());
  return message;
};

export const restoreUserThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const parsedResponse = await response.json(); // always an object with a user property
  const currentUser = parsedResponse.user; //  either null or an object with user details properties
  dispatch(restoreUser(currentUser));
};

export const signupUserThunk = (userDetails) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify(userDetails),
    });

    const parsedResponse = await response.json();
    const newUser = parsedResponse.user;
    dispatch(loginUser(newUser));
    return newUser;
  } catch (errorResponse) {
    const error = await errorResponse.json();
    return error;
  }
};

// default session state - no one logged in
const sessionReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // this is what state.user should look like if someone is logged in: { id, email, username, firstName, lastName }
      return { ...state, user: action.user };
    case LOGOUT_USER:
      return { ...state, user: action.user };
    case RESTORE_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default sessionReducer;
