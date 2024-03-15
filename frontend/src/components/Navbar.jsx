import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    return (
        <div className='container'>
            <h2>Socpost</h2>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    {isLoggedIn ? (
                        <>
                            <li><a href='#' onClick={handleCreatePost}>Create Post</a></li>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><a href='#' onClick={handleLogout}>Logout</a></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            <ul className="nav-links nav-links2">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
        </div>
    );
}

export default Navbar;
