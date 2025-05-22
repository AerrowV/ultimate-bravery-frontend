import { useNavigate } from "react-router-dom";
import facade from "../apiFacade";
import styles from "./Header.module.css";

export default function Header() {
  const username = facade.getUsername();
  const navigate = useNavigate();

  const handleLogout = () => {
    facade.logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.userBox}>
      {!username ? (
        <>
          <button className={styles.headerButton} onClick={handleLogin}>
            Login
          </button>
          <button className={styles.headerButton} onClick={handleRegister}>
            Sign Up
          </button>
        </>
      ) : (
        <>
         <span>{username.charAt(0).toUpperCase() + username.slice(1)}</span>

          <button className={styles.headerButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
      <button className={styles.headerButton} onClick={handleHome}>
        Home
      </button>
    </div>
  );
}
