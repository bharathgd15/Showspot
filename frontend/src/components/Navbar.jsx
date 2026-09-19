import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">

            <div className="logo">
                🎬 ShowSpot
            </div>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>

        </nav>
    );
}

export default Navbar;