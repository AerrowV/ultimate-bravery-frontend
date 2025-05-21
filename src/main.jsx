import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GameDetails from './router/GameDetails.jsx';
import Home from './router/Home.jsx';
import Games from './router/Games.jsx';
import Guns from './router/Guns.jsx';
import Maps from './router/Maps.jsx';
import Routes from './router/Routes.jsx';
import Strategies from './router/Strategies.jsx';
import ErrorPage from './components/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/games",
    element: <Games />
  },
  {
    path: "/games/1",
    element: <GameDetails />
  },
  {
    path: "/guns",
    element: <Guns />
  },
  {
    path: "/maps",
    element: <Maps />
  },
  {
    path: "/strategies",
    element: <Strategies />
  },
  {
    path: "/routes",
    element: <Routes />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
