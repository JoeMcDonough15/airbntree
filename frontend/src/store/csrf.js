import Cookies from "js-cookie";

export const csrfFetch = async (url, options = {}) => {
  if (!options.headers) {
    options.headers = {};
  }

  if (!options.method) {
    options.method = "GET";
  }

  if (options.method.toUpperCase() !== "GET") {
    options.headers = {
      "Content-Type": options.headers["Content-Type"] || "application/json",
      "XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
    };
  }

  const response = await window.fetch(url, options);

  if (response.status >= 400) {
    throw new Error(response);
  }

  return response;
};

export const restoreCSRF = () => {
  return csrfFetch("/api/csrf/restore");
};
