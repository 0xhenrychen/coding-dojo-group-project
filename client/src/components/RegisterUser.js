// 5/17 - Henry - This is the component for a new user to register. Confirmed it's working. Jessica, please use as you see fit.

import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const RegisterUser = (props) => {
    const navigate = useNavigate()
    
    const [user, setUser] = useState({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        })

    const [errors, setErrors] = useState({})
    
    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div>
            <form onSubmit = {submitHandler}>
                <div>
                    <h2>Register:</h2>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" name = "firstName" onChange = {changeHandler} value = {user.firstName} />
                        {
                            errors.firstName ?
                            <p className = "text-danger">{errors.firstName.message}</p> :
                            null
                        }
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" name = "lastName" onChange = {changeHandler} value = {user.lastName} />
                        {
                            errors.lastName ?
                            <p className = "text-danger">{errors.lastName.message}</p> :
                            null
                        }
                    </div>
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
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input type="password" name = "confirmPassword" onChange = {changeHandler} value = {user.confirmPassword} />
                        {
                            errors.confirmPassword ?
                            <p className = "text-danger">{errors.confirmPassword.message}</p> :
                            null
                        }
                    </div>
                    <div>
                        <input type = "submit" value = "Create Account" />
                    </div>
                </div>
            </form>
            <p>Already have an account? <Link to={'/'}>Log in</Link></p>
        </div>
    );
}

export default RegisterUser;