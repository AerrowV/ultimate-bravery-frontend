import React, { useState } from "react";
import styles from "./LogIn.module.css";
import { Link, useNavigate } from "react-router-dom";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const navigate = useNavigate();

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password)
      .then(() => navigate("/"))
      .catch((err) => {
        console.error("Login failed", err);
        alert("Login failed. Check your credentials.");
      });
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={performLogin} className={styles.loginForm}>
        <h2 className={styles.loginTitle}>Sign In</h2>
        <input
          className={styles.loginInput}
          placeholder="Username"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          className={styles.loginInput}
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button className={styles.loginButton} type="submit">
          Login
        </button>
        <p className={styles.altText}>Don't have an account?</p>
        <Link to="/register" className={styles.registerLink}>
          Create one now
        </Link>
      </form>
    </div>
  );
}

export default LogIn;
