import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WELCOME TO ULTIMATE BRAVERY</h1>
      <br />
      <p className={styles.subtitle}>
        Ultimate Bravery API is a fun and creative strategy generator for
        multiplayer games like CS2, LoL and the like. Users choose a game, and
        the API returns three different strategies for the next round - a
        serious one, an average one, and a troll one.
      </p>

      <Link to="/games">
        <button className={styles.button}>BEGIN NOW</button>
      </Link>
      <br/>
      <Link to="/routes" className={styles.linkText}>
        API ROUTES
      </Link>
    </div>
  );
}
