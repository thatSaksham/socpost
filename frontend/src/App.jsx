import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginSignup from './components/LoginSignup';
import Profile from './components/Profile';
import ContactUs from './components/ContactUs';
import EditPost from './components/EditPost';
import CreatePost from './components/CreatePost';
import About from './components/About';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginSignup login={true} />} />
                <Route path="/signup" element={<LoginSignup login={false} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/edit-post/:postId" element={<EditPost />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
