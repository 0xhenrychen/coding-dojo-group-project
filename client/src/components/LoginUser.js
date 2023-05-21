// 5/17 - Henry - This is the component for an existing user to log in. Confirmed it's working. Jessica, please use as you see fit.

import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const LoginUser = (props) => {
    const navigate = useNavigate()
    
    const [user, setUser] = useState({
            email: "",
            password: ""
        })

    const [errors, setErrors] = useState({})
    
    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', user, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div id='loginPage'>
            <form onSubmit = {submitHandler}>
                <div>
                    <h2>Login:</h2>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name = "email" onChange = {changeHandler} value = {user.email} />
                        {
                            errors.email ?
                            <p className = "text-danger">{errors.email.message}</p> :
                            null
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name = "password" onChange = {changeHandler} value = {user.password} />
                        {
                            errors.password ?
                            <p className = "text-danger">{errors.password.message}</p> :
                            null
                        }
                    </div>
                    <div>
                        <input type = "submit" value = "Login" />
                    </div>
                </div>
            </form>
            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
        </div>
    );
}

export default LoginUser;