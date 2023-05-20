// 5/17 - Henry - This is the component for a new user to register. Confirmed it's working. Jessica, please use as you see fit.

import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const RegisterUser = (props) => {
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null);
    
    const [user, setUser] = useState({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null,
            posts: [],
        })

    const [errors, setErrors] = useState({})
    
    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const imgHandler = (e) => {
        const imgSrc = URL.createObjectURL(e.target.files[0]);
        setUser({...user, [e.target.name]: imgSrc});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials: true})
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
                        <label htmlFor="username">Username:</label>
                        <input type="text" name = "username" onChange = {changeHandler} value = {user.username} />
                        {
                            errors.username ?
                            <p className = "text-danger">{errors.username.message}</p> :
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
                <label htmlFor="image">Profile Picture:</label>
                        {selectedImage && (
                            <div>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={URL.createObjectURL(selectedImage)}
                            />
                            <br />
                            <button onClick={() => setSelectedImage(null)}>Remove</button>
                            </div>
                        )}
                        <input
                            type="file"
                            name="image"
                            onChange={imgHandler}
                        />
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