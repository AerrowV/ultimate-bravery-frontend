import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./Home";
import Games from "./router/Games";
import Guns from "./router/Guns";
import Maps from "./router/Maps";
import Strategies from "./router/Strategies";
import LogIn from "./components/LogIn";
import LoggedIn from "./components/LoggedIn";
import ErrorPage from "./components/ErrorPage";
import facade from "./apiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());

  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then(() => setLoggedIn(true))
      .catch(() => alert("Wrong credentials"));
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/guns" element={<Guns />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/login" element={<LogIn login={login} />} />
        <Route path="/loggedin" element={<LoggedIn />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

      {loggedIn && (
        <div className="logout-wrapper">
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
