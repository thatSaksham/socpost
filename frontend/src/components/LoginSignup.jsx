import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';

const LoginSignup = ({login}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLogin, setIsLogin] = useState(login);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        if (isLogin) {
            axios.post('http://localhost:5000/api/auth/login', formData)
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userId', res.data.userId);
                    console.log(res);
                    navigate('/');
                })
                .catch(err => {
                    setError('Invalid credentials');
                    console.log(err);
                });
        } else {
            axios.post('http://localhost:5000/api/auth/register', formData)
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    navigate('/');
                })
                .catch(err => {
                    setError('User already exists');
                    console.log(err);
                });
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    return (
        <div className='logincontainer dfl jcc aic fdc'>
            <h2>{isLogin ? 'Login' : 'Signup'}</h2>
            <div className='form'>
                <input type="text" name="email" placeholder="Username" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Signup'}</button>
                {error && <p className="error">{error}</p>}
            </div>
            <p onClick={toggleForm}>{isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Log in'}</p>
        </div>
    );
}

export default LoginSignup;
