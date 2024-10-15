import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { restoreUserThunk } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import SpotDetails from "./components/SpotDetailsPage";
import CreateOrEditASpotPage from "./components/CreateOrEditASpotPage";
import ManageSpotsPage from "./components/ManageSpotsPage";

const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUserThunk()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <main>
          <Outlet />
        </main>
      )}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/spots",
        children: [
          { path: ":spotId", element: <SpotDetails /> },
          { path: ":spotId/edit", element: <CreateOrEditASpotPage /> },
          { path: "new", element: <CreateOrEditASpotPage /> },
          { path: "current", element: <ManageSpotsPage /> },
        ],
      },
      { path: "/*", element: <h1>Not Found</h1> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
