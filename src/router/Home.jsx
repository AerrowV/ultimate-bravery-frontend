import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>WELCOME TO ULTIMATE BRAVERY</h1>
      <Link to="/games">
        <button>BEGIN NOW</button>
      </Link>
      <br/>
      <h2>Vision</h2>
      <p>Ultimate Bravery API er en sjov og kreativ strategi-generator til multiplayer spil som CS2, LoL og lignende. Brugere vælger et spil, og API’et returnerer tre forskellige strategier til næste runde - en seriøs, en gennemsnitlig og en troll.</p>
    </div>
  );
}
