import { useEffect, useState } from "react";
import facade from "../apiFacade";

function LoggedIn() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    facade.fetchData()
      .then(data => setGames(data))
      .catch(err => setError("Could not fetch games: " + err.status));
  }, []);

  return (
<div className="logged-in-wrapper">
  <div className="gaming-bg"></div>

  <div className="container">
    <h2>Available Games</h2>
    {error && <p>{error}</p>}
    <ul>
      {games.map(game => (
        <li key={game.id}>{game.name}</li>
      ))}
    </ul>
  </div>
</div>

  );
}

export default LoggedIn;
