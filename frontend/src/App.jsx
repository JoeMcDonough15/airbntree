import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { restoreUserThunk } from "./store/session";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";

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
      {isLoaded && <Outlet />}
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <h1>Welcome</h1> },
      { path: "/login", element: <LoginFormPage /> },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      { path: "/*", element: <h1>Not Found</h1> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
