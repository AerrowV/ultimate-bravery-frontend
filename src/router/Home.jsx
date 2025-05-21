import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import facade from "../apiFacade";

export default function Home() {
    const username = facade.getUsername();
    const navigate = useNavigate();

    const handleLogout = () => {
      facade.logout();
      navigate("/login");
    };

  return (
    <div className={styles.container}>
      {username && (
        <div className={styles.userBox}>
          <span>👤 {username}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <h1 className={styles.title}>WELCOME TO ULTIMATE BRAVERY</h1>
      <br />
      <p className={styles.subtitle}>
        ARE YOU TIRED OF PLAYING THE SAME OLD BORING META STRATEGIES?
        ULTIMATE BRAVERY GOT YOU COVERED. 
        APPLY FILTERS AND UNLOCK A FRESH, UNEXPECTED GAMEPLAY EXPERIENCE—IT'S LIKE PLAYING A WHOLE NEW GAME!
      </p>

      <Link to="/games">
        <button className={styles.button}>BEGIN NOW</button>
      </Link>
      <br/>
      <Link to="/routes" className={styles.linkText}>
        API ROUTES
      </Link>
            <br/>
      <Link to="/login" className={styles.button}>Login</Link>
      <Link to="/routes" className={styles.button}>Sign Up</Link>
    </div>
  );
}
