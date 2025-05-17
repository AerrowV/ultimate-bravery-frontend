const BASE_URL = 'https://ultimatebravery.yumiya.dk/api/';
const LOGIN_ENDPOINT = "auth/login";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const setToken = (token) => {
    sessionStorage.setItem('jwtToken', token);
  };

  const getToken = () => {
    return sessionStorage.getItem('jwtToken');
  };

  const loggedIn = () => {
    return getToken() != null;
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", false, {username: user, password: password });
    return fetch(BASE_URL + LOGIN_ENDPOINT, options)
        .then(handleHttpErrors)
        .then(res => {setToken(res.token) })   
  };

  const fetchData = () => {
    const options = makeOptions("GET", true);
    return fetch(BASE_URL, options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    const opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
      }
    };
    if (addToken && loggedIn()) {
      opts.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const getUserRoles = () => {
    const token = getToken();
    if (token != null) {
      const payloadBase64 = token.split('.')[1];
      const decodedClaims = JSON.parse(window.atob(payloadBase64));
      return decodedClaims.roles;
    } else {
      return "";
    }
  };

  const hasUserAccess = (neededRole, loggedIn) => {
    const roles = getUserRoles().split(',');
    return loggedIn && roles.includes(neededRole);
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    getUserRoles,
    hasUserAccess
  };
}

const facade = apiFacade();
export default facade;
