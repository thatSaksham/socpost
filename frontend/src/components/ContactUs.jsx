import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: ''
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    
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
        setIsSubmitting(true);
        axios.post('http://localhost:5000/api/contact', formData)
            .then(res => {
                setIsSubmitting(false);
                setIsSuccess(true);
                setTimeout(() => {
                    setIsSuccess(false);
                    setFormData({
                        name: '',
                        email: '',
                        query: ''
                    });
                    window.location.reload(); // Reload the page
                }, 3000);
            })
            .catch(err => {
                setIsSubmitting(false);
                setIsError(true);
            });
    };

    return (
        <div className='contactcontainer'>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <h2 className='dfl jcc'>Contact Us</h2>
            <div className='contactbox'>
                <div className='inpt'>
                    <label htmlFor="name">Name:</label>&ensp;
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div className='inpt'>
                    <label htmlFor="email">Email:</label>&ensp;
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className='inpt'>
                    <label htmlFor="query">Query:</label>&ensp;
                    <textarea id="query" name="query" value={formData.query} onChange={handleChange} cols={30} rows={15} ></textarea>
                </div>
                
                {isSubmitting && <p className="submit-status">Sending...</p>}
                {isSuccess && <p className="submit-status success">Query submitted successfully!</p>}
                {isError && <p className="submit-status error">Oops! Something went wrong. Please try again later.</p>}

                <button onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
            </div>
        </div>
    );
}

export default ContactUs;