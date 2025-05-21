import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- import this

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const navigate = useNavigate(); // <-- get navigation function

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password)
      .then(() => {
        navigate("/"); // <-- redirect after successful login
      })
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
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin} className="login-form">
        <input
          className="login-input"
          placeholder="Username"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          id="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
