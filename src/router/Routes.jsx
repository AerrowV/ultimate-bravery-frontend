import styles from "./Routes.module.css";

const routes = [
  {
    method: "GET",
    endpoint: "/games",
    description: "List all supported games",
    access: "ANYONE"
  },
  {
    method: "POST",
    endpoint: "/games",
    description: "Add a new game",
    access: "ADMIN"
  },
  {
    method: "DELETE",
    endpoint: "/game/{id}",
    description: "Delete a specific game from the list",
    access: "ADMIN"
  },
  {
    method: "GET",
    endpoint: "/games/strategies",
    description: "Games all strategies",
    access: "ANYONE"
  },
  {
    method: "GET",
    endpoint: "/games/{id}/strategies/",
    description: "Get all strategies for a specific game",
    access: "ANYONE"
  },
  {
    method: "GET",
    endpoint: "/games/{id}/map/{id}/strategies/random/",
    description: "Get a random strategy for a specific map in a specific game",
    access: "USER"
  },
  {
    method: "GET",
    endpoint: "/games/{id}/map/{id}/strategies/type/random",
    description: "Get a strategy of a specific type",
    access: "USER"
  },
  {
    method: "POST",
    endpoint: "/games/{id}/map/{id}/strategies/",
    description: "Add a new strategy",
    access: "ADMIN"
  },
  {
    method: "DELETE",
    endpoint: "/games/{id}/map/{id}/strategies/{id}",
    description: "Delete a strategy",
    access: "ADMIN"
  },
  {
    method: "GET",
    endpoint: "/games/{id}/map/{id}/guns/{id}",
    description: "Get a specific gun",
    access: "ADMIN"
  },
  {
    method: "DELETE",
    endpoint: "/games/{id}/map/{id}/guns/{id}",
    description: "Delete a gun",
    access: "ADMIN"
  },
  {
    method: "POST",
    endpoint: "/games/{id}/map/{id}/guns/",
    description: "Add a new gun",
    access: "ADMIN"
  },
  {
    method: "GET",
    endpoint: "/games/{id}/map/{id}",
    description: "Get a map",
    access: "USER"
  },
  {
    method: "POST",
    endpoint: "/games/{id}/map/",
    description: "Add a new map",
    access: "ADMIN"
  },
  {
    method: "DELETE",
    endpoint: "/games/{id}/map/{id}",
    description: "Delete a map",
    access: "ADMIN"
  },
  {
    method: "GET",
    endpoint: "/games/{id}/map/{id}/guns/random/",
    description: "Get a random gun",
    access: "USER"
  },
  {
    method: "POST",
    endpoint: "/games/auth/login",
    description: "Login to an account",
    access: "ANYONE"
  },
  {
    method: "POST",
    endpoint: "/games/auth/register",
    description: "Register an account",
    access: "ANYONE"
  },
  {
    method: "GET",
    endpoint: "/routes",
    description: "Get all endpoints",
    access: "ANYONE"
  }
];

export default function Routes() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>API Endpoint Overview</h1>
      <div className={styles.cardGrid}>
        {routes.map((route, i) => (
          <div key={i} className={`${styles.card} ${styles[route.method] || ""}`}>
            <span className={styles.method}>{route.method}</span>
            <p className={styles.endpoint}>{route.endpoint}</p>
            <p className={styles.description}>{route.description}</p>
            <span className={styles.access}>{route.access}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
