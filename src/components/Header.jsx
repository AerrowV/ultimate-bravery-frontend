// components/Header.jsx
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

  if (!username) return null;

  return (
    <div className={styles.userBox}>
      <span>👤 {username}</span>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
