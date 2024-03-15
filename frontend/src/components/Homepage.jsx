import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import './Homepage.css'

const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            axios.get('http://localhost:5000/api/posts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (Array.isArray(res.data)) {
                    setPosts(res.data);
                } else {
                    console.error('Invalid data format received:', res.data);
                }
            })
            .catch(err => {
                console.error('Error fetching posts:', err);
            });
        }
    }, [navigate]);

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ? (
                <div className='postcontainer'>
                    <div className='posts'>
                        {posts.map(post => (
                            <div className='post' key={post._id}>
                                <h3>{post.title}</h3>
                                <hr />
                                <p>{post.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ): <div className='dfl jcc tac f20'>Welcome to Socpost! <br /> Please log in or sign up to view Posts.</div>}
        </div>
    );
}

export default Homepage;