import Cookies from "js-cookie";

// makes sense that csrfFetch should live in the store directory becuase al of our thunk action creators will use it to
// connect to the Express server

export const csrfFetch = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  if (!options.method) {
    options.method = "GET";
  }

  // for XSRF-TOKEN needed for all requests other than GET
  if (options.method.toUpperCase() !== "GET") {
    options.headers = {
      "Content-Type": options.headers["Content-Type"] || "application/json",
      "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"), // get the XSRF-TOKEN that we set in cookies from line 38 when the initial contact was made to Express, in other words when this csrfFetch() function first ran.
    };
  }

  // if it's just a GET request, the _csrf will be set onto the cookies by the express app.js file.  But if it's any other request,
  // we need to have that XSRF-TOKEN.  THEY ARE TWO DIFFERENT TOKENS.  _csrf is needed for everything, XSRF-TOKEN is needed for any create, update, or delete requests
  const response = await window.fetch(url, options); // exactly the same as running fetch() in the browser console

  if (response.status >= 400) {
    throw response; // throw response instead of an Error, so we can capture and handle status codes >= 400
  }

  return response;
};

// using our csrfFetch() above to access the /api/csrf/restore route on our express server in order to get and set:
// 1) the _csrf token for all requests to the server, and
// 2) an XSRF-TOKEN for all requests other than GET.
export const restoreCSRF = () => {
  return csrfFetch("/api/csrf/restore"); // this will be a GET request and will return a json response that is an {'XSRF-TOKEN': "some-valid-token-string"} with a status code of 200
};

// after line 38 executes, we will have both _csrf and XSRF-TOKEN in cookies.
