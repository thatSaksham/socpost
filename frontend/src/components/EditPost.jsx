import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './EditPost.css';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { postId } = useParams();
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${postId}` , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                setTitle(res.data.title);
                setContent(res.data.content);
            })
            .catch(err => console.log(err));
    }, [postId]);

    const handleSubmit = () => {
        axios.put(`http://localhost:5000/api/posts/${postId}`, { title, content } , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                navigate('/profile');
            })
            .catch(err => console.log(err));
    };

    return (
        <>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className='dfl jcc fdc aic editcontainer crpostcontainer'>
                <h2>Edit Post</h2>
                <div className='dfl fdc newcontainer editbox'>
                    <input type="text" id="title" name="title" value={title} placeholder="Title" onChange={e => setTitle(e.target.value)} />
                    <textarea value={content} cols={25} rows={13} onChange={e => setContent(e.target.value)}></textarea>
                    <button onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </>
    );
}

export default EditPost;