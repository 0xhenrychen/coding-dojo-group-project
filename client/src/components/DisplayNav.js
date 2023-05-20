// 5/17 - Henry - Added a navigation component to show up at the top of every other component, i.e. "page". Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const DisplayNav = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {
                navigate('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if(location.pathname === "/" || location.pathname === "/register") {
    return null
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "darkgreen", color: "white", padding: "20px", marginBottom: "20px"}}>
            <h1>Get Out</h1>
            <p>Your next outdoor adventure awaits. Share it with your family and friends.</p>
            <p><Link to={'/home'}>Home</Link> | <Link to='/post/new'>New Post</Link> | <Link to='/profile'>Profile</Link> | <span onClick={logout}>Logout</span></p>
        </div>
    );
}

export default DisplayNav;
