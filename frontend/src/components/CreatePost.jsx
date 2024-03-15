import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './CreatePost.css'

const CreatePost = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('token');

        if (!formData.title || !formData.content) {
            alert('Please fill in all fields');
            return;
        }

        axios.post('http://localhost:5000/api/posts', formData,{
            headers: {
                'Authorization': `Bearer ${token}`
              }
        })
            .then(res => {
                alert('Post created successfully');
                window.location.reload(); 
            })
            .catch(err => {
                console.log(err);
                alert('An error occurred while creating the post');
            });
    };

    return (
        <div className='crpostcontainer'>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='dfl fdc aic'>
                <h2 className='dfl jcc'>Create a New Post</h2>
                <div className='dfl fdc aic jcc newcontainer g20'>
                        <input type="text" id="title" name="title" placeholder="Title" onChange={handleChange} />
                        <textarea id="content" name="content" placeholder="Content" cols={45} rows={15} onChange={handleChange} />
                    <button className='btn' onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;