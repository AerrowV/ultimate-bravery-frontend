import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <h1 className={styles.title}>WELCOME TO ULTIMATE BRAVERY</h1>
      <br />
      <p className={styles.subtitle}>
        ARE YOU TIRED OF PLAYING THE SAME OLD BORING META STRATEGIES? ULTIMATE
        BRAVERY GOT YOU COVERED. APPLY FILTERS AND UNLOCK A FRESH, UNEXPECTED
        GAMEPLAY EXPERIENCE—IT'S LIKE PLAYING A WHOLE NEW GAME!
      </p>

      <Link to="/games">
        <button className={styles.button}>BEGIN NOW</button>
      </Link>
      <br />
      <Link to="/routes" className={styles.linkText}>
        API ROUTES
      </Link>
      <br />
    </div>
  );
}
