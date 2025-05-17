import { useEffect, useState } from "react";
import styles from '../App.module.css';

const Games = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState("");

useEffect(() => {
  fetch(`https://ultimatebravery.yumiya.dk/api/games/`)
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
      <a href="https://example.com/1" className={styles.box} style={{ backgroundImage: `url('/images/image1.jpg')` }}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>Box 1</h2>
        </div>
      </a>
      <a href="https://example.com/2" className={styles.box} style={{ backgroundImage: `url('/images/image2.jpg')` }}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>Box 2</h2>
        </div>
      </a>
      <a href="https://example.com/3" className={styles.box} style={{ backgroundImage: `url('/images/image3.jpg')` }}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>Box 3</h2>
        </div>
      </a>
    </div>
  );
};

export default Games;
