import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./router/Home.jsx";
import Games from "./router/Games.jsx";
import Guns from "./router/Guns.jsx";
import Maps from "./router/Maps.jsx";
import Routes from "./router/Routes.jsx";
import Strategies from "./router/Strategies.jsx";
import ErrorPage from "./components/ErrorPage.jsx";
import Login from "./components/LogIn.jsx";
import LoggedIn from "./components/LoggedIn.jsx";
import facade from "./apiFacade.js";
import GameDetails from "./router/GameDetails.jsx";
import Register from "./components/Register.jsx";

function AppRouter() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());

  const login = (username, password) => {
    return facade.login(username, password).then(() => setLoggedIn(true));
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/games",
      element: <Games />,
    },
    {
      path: "/games/1",
      element: <GameDetails />,
    },
    {
      path: "/guns",
      element: <Guns />,
    },
    {
      path: "/maps",
      element: <Maps />,
    },
    {
      path: "/strategies",
      element: <Strategies />,
    },
    {
      path: "/routes",
      element: <Routes />,
    },
    {
      path: "/login",
      element: <Login login={login} />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/profile",
      element: loggedIn ? (
        <>
          <button onClick={logout}>Logout</button>
          <LoggedIn />
        </>
      ) : (
        <Login login={login} />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
