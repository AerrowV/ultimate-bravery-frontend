import { useEffect, useState } from "react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}games`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch games");
        return res.json();
      })
      .then((data) => setGames(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>Error: {error}</p>;
  if (!games.length) return <p>Loading games...</p>;

  return (
    <div className="games-page">
      <h2>Available Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <strong>{game.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
