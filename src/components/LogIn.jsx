import { useState } from "react";

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };

  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={performLogin} className="login-form">
        <input className="login-input" placeholder="User Name" id="username" onChange={onChange} value={loginCredentials.username} />
        <input className="login-input" type="password" placeholder="Password" id="password" onChange={onChange} value={loginCredentials.password} />
      <button className="login-button" type="submit">Login</button>
      </form>

    </div>
  );
}

export default LogIn;
