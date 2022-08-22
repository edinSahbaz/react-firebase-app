import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <h2>Demo App</h2>

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/users">Users</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashborad</Link>
      </div>
    </nav>
  );
};

export default Navbar;
