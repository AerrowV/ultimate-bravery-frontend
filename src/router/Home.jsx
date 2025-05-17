
import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div id="sidebar">
        <h1>WELCOME TO ULTIMATE BRAVERY</h1>
        <nav>
          <ul>
            <li>
              <Link to="/games">BEGIN NOW</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div id="main">
        <Outlet />
      </div>
    </>
  );
}
