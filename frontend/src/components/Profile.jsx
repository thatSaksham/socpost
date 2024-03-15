import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://localhost:5000/api/posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            const filteredPosts = res.data.filter(post => post.author == userId);
            setPosts(filteredPosts);
        })
        .catch(err => console.log(err));
    }, [navigate, token, userId]);

    const handleEdit = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const handleDelete = (postId) => {
        axios.delete(`http://localhost:5000/api/posts/${postId}` , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setPosts(posts.filter(post => post._id !== postId));
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar isLoggedIn={true} setIsLoggedIn={setIsLoggedIn} />
            <div className='postcontainer'>
                    <div className='posts'>
                        {posts.map(post => (
                            <div className='post edpost' key={post._id}>
                                <h3>{post.title}</h3>
                                <hr />
                                <p>{post.content}</p>
                                <div className='dfl g5 jcc mb10'>
                                    <button onClick={() => handleEdit(post._id)}>Edit</button>
                                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
}

export default Profile;
