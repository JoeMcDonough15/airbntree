import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import "./index.css";
import * as sessionActions from "./store/session";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF(); // no need to write await, because we are not capturing the return value.

  // * notes just to demonstrate that restoreCSRF() is the same process as manually connecting to port 8000 through the browser's console by fetching a new XSRF-TOKEN with a GET request, storing it in cookies, and then logging that token just to see it. i.e. {'XSRF-TOKEN': 'RBk9SR36-vqxLYbxtGyoIO_oBLzY65PNsKa8'}, which gives the client (browser) permission to perform full CRUD on the databse through Express.
  // const token = await restoreCSRF().then((response) => response.json()); // set a valid XSRF-TOKEN and _csrf token, both in cookies.
  // console.log("TOKEN: ", token);

  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
