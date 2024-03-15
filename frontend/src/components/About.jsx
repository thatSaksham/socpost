import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import video1 from '../assets/video1.mp4';
import './About.css';

function About() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='aboutcontainer'>
                <h2>About</h2>
                <video className='vid' width="320" height="240" controls>
                    <source src={video1} type="video/mp4" />{" "}
                    Your browser does not support the video tag.
                </video>
            </div>
        </>
    );
}

export default About;
