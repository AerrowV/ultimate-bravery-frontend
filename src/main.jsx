import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './router/Home.jsx';
import Games from './router/Games.jsx';
import Guns from './router/Guns.jsx';
import Maps from './router/Maps.jsx';
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
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
