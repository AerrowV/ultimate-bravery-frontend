import { useEffect, useState } from "react";

const Games = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}games/`)
    .then(async (res) => {
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setGames(json);
      } catch (err) {
        console.error("Failed to parse JSON:", text);
        setError("Invalid JSON from backend");
      }
    })
    .catch((err) => setError("Fetch failed: " + err.message));
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
