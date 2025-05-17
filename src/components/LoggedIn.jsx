import { useEffect, useState } from "react";
import facade from "../apiFacade";

function LoggedIn({ LoggedIn }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    facade
      .fetchData()
      .then((data) => {
        if (Array.isArray(data)) {
          const gameNames = data.map((game) => game.name).join(", ");
          setDataFromServer(gameNames);
        } else if (typeof data === "object") {
          setDataFromServer(JSON.stringify(data));
        } else {
          setDataFromServer(data);
        }
      })
      .catch((err) => setDataFromServer("Error: " + err.status));
  }, []);

  return (
    <div className="logged-in-wrapper">
      <div className="gaming-bg"></div>

      <div className="container">
        <h2>Available Games</h2>
        <h3 style={{ whiteSpace: "pre-line" }}>
          {dataFromServer.split(", ").join("\n")}
        </h3>
      </div>
    </div>
  );
}

export default LoggedIn;
