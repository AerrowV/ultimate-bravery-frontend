import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">
      <h1>WELCOME TO ULTIMATE BRAVERY</h1>
      <p>Are you ready for your next random challenge?</p>
      <Link to="/games">
        <button>BEGIN NOW</button>
      </Link>
    </div>
  );
}
