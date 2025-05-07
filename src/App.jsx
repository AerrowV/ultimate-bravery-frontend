import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/LogIn";
import LoggedIn from "./components/LoggedIn";
import ErrorPage from "./components/ErrorPage";
import facade from "./apiFacade";
import { useState } from "react";


function App() {
  const [loggedIn, setLoggedIn] = useState(facade.loggedIn());

  const login = (user, pass) => {
    facade.login(user, pass)
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
        <Route path="/" element={
          !loggedIn ? (
            <LogIn login={login} />
          ) : (
            <div>
              <LoggedIn />
              <div className="logout-wrapper">
                <button className="logout-button" onClick={logout}>Logout</button>
              </div>
            </div>
          )
        } errorElement={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
