import React, { useState } from "react";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const init = { username: "", password: "", confirmPassword: "" };
  const [registerCredentials, setRegisterCredentials] = useState(init);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8 && password.length <= 16;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    return lengthValid && hasCapital && hasSpecial;
  };

  const validateusername = (username) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

  const performRegister = (evt) => {
    evt.preventDefault();
    setError("");

    const { username, password, confirmPassword } = registerCredentials;

    if (!validateusername(username)) {
      setError("Please enter a valid username address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be 8–16 characters, include a capital letter and a special character."
      );
      return;
    }

    fetch("https://ultimatebravery.yumiya.dk/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const contentType = res.headers.get("content-type");
          let errorMessage = "Registration failed";

          if (contentType && contentType.includes("application/json")) {
            const err = await res.json();
            errorMessage = err.message || errorMessage;
          } else {
            const errText = await res.text();
            if (errText) errorMessage = errText;
          }

          throw new Error(errorMessage);
        }
        return res.json();
      })
      .then(() => {
        alert("Registration successful. You can now log in.");
        navigate("/login");
      })
      .catch((err) => {
        console.error("Registration failed", err);
        setError(err.message);
      });
  };

  const onChange = (evt) => {
    setRegisterCredentials({
      ...registerCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={performRegister} className={styles.registerForm}>
        <h2 className={styles.registerTitle}>Create Account</h2>
        <input
          className={styles.registerInput}
          type="username"
          placeholder="Username"
          id="username"
          onChange={onChange}
          value={registerCredentials.username}
          required
        />
        <input
          className={styles.registerInput}
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={registerCredentials.password}
          required
        />
        <input
          className={styles.registerInput}
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
          onChange={onChange}
          value={registerCredentials.confirmPassword}
          required
        />
        {error && <p className={styles.errorText}>{error}</p>}
        <button className={styles.registerButton} type="submit">
          Register
        </button>
        <p className={styles.altText}>Already have an account?</p>
        <Link to="/login" className={styles.loginLink}>
          Log in here
        </Link>
      </form>
    </div>
  );
}

export default Register;
