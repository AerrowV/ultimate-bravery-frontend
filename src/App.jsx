import { useState } from "react";
import LogIn from "./components/LogIn";
import LoggedIn from "./components/LoggedIn";
import facade from "./apiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (username, password) => {
    facade.login(username, password)
      .then(() => setLoggedIn(true))
      .catch((err) => alert("Login failed: " + err.message));
  };

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <button onClick={logout}>Logout</button>
          <LoggedIn />
        </div>
      )}
    </div>
  );
}

export default App;
