import { useEffect, useState } from "react";
import styles from '../App.module.css';

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
    <div className={styles.container}>
      {games.map((game) => (
        <a
          key={game.id}
          href={`/games/${game.id}`}
          className={styles.box}
          style={{ backgroundImage: `url(/images/${game.id}.jpg)` }}
        >
          <div className={styles.overlay}>
            <h2 className={styles.title}>{game.name}</h2>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Games;
