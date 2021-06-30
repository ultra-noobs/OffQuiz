import "./navbar.scss";
import { Link } from 'react-router-dom';

const Navbar = ()=>{
    return(
        <nav className="navbar">
            <div className="logo">
                <Link to="/">OffQuiz</Link>
            </div>
            <ul className="navLink">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">SignUp</Link></li>
                <li><Link to="/aboutus">About Us</Link></li>
                <li><Link to="/download">About Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;