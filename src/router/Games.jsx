import { useEffect, useState } from "react";
import styles from "./Games.module.css";
import Header from "../components/Header";

const Games = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://ultimatebravery.yumiya.dk/api/games/`)
      .then(async (res) => {
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Raw Response:", text);
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
      <Header />
      {games.map((game) => (
        <a
        key={game.id}
          href={`/games/${game.id}`}
          className={styles.box}
          style={{ backgroundImage: `url("/images/${game.id}.jpg")` }}
        >
          <img
            src={`/images/logos/${game.id}.png`}
            alt={`${game.name} logo`}
            className={styles.logo}
          />
        </a>
      ))}
    </div>
  );
};

export default Games;
