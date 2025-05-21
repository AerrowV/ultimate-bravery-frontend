import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WELCOME TO ULTIMATE BRAVERY</h1>
      <br />
      <p className={styles.subtitle}>
        ARE YOU TIRED OF PLAYING THE SAME OLD BORING META STRATEGIES?
        ULTIMATE BRAVERY GOT YOU COVERED. 
        CHOOSE SOME FILTERS AND THEN GET A TOTALLY DIFFRENT PLAY EXPERIENCE, LIKE YOU NEVER TRIED BEFORE.
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
