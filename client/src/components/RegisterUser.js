// 5/17 - Henry - This is the component for a new user to register. Confirmed it's working. Jessica, please use as you see fit.

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./cssComponents/RegisterUser.css";

const RegisterUser = (props) => {
	const navigate = useNavigate();
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
	});

	const [errors, setErrors] = useState({});

	const changeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const imgHandler = (e) => {
		const imgSrc = URL.createObjectURL(e.target.files[0]);
		setUser({ ...user, [e.target.name]: imgSrc });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/register", user, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				navigate("/home");
			})
			.catch((err) => {
				console.log(err);
				setErrors(err.response.data.errors);
			});
	};

	return (
		<div>
			<div className="logo-container">
				<img className="logo" src="/get-out-logo.png" alt="App Logo" />
			</div>
			<form onSubmit={submitHandler}>
				<div className="register-container">
					<h2>Register:</h2>
					<div>
						<label htmlFor="firstName">First Name:</label>
						<input
							type="text"
							name="firstName"
							onChange={changeHandler}
							value={user.firstName}
							className="register-input"
						/>
						{errors.firstName ? (
							<p className="text-danger">{errors.firstName.message}</p>
						) : null}
					</div>
					<div>
						<label htmlFor="lastName">Last Name:</label>
						<input
							type="text"
							name="lastName"
							onChange={changeHandler}
							value={user.lastName}
							className="register-input"
						/>
						{errors.lastName ? (
							<p className="text-danger">{errors.lastName.message}</p>
						) : null}
					</div>
					<div>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							name="username"
							onChange={changeHandler}
							value={user.username}
							className="register-input"
						/>
						{errors.username ? (
							<p className="text-danger">{errors.username.message}</p>
						) : null}
					</div>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							onChange={changeHandler}
							value={user.email}
							className="register-input"
						/>
						{errors.email ? (
							<p className="text-danger">{errors.email.message}</p>
						) : null}
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							onChange={changeHandler}
							value={user.password}
							className="register-input"
						/>
						{errors.password ? (
							<p className="text-danger">{errors.password.message}</p>
						) : null}
					</div>
					<div>
						<label htmlFor="confirmPassword">Confirm Password:</label>
						<input
							type="password"
							name="confirmPassword"
							onChange={changeHandler}
							value={user.confirmPassword}
							className="register-input"
						/>
						{errors.confirmPassword ? (
							<p className="text-danger">{errors.confirmPassword.message}</p>
						) : null}
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
							className="register-input"
						/>
					</div>
					<div>
						<input
							type="submit"
							value="Create Account"
							className="register-btn"
						/>
					</div>
				</div>
			</form>
			<p className="login-link">
				Already have an account? <Link to={"/"}>Log in</Link>
			</p>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#00cba9"
					fill-opacity="1"
					d="M0,192L205.7,256L411.4,96L617.1,224L822.9,128L1028.6,256L1234.3,224L1440,128L1440,320L1234.3,320L1028.6,320L822.9,320L617.1,320L411.4,320L205.7,320L0,320Z"
				></path>
			</svg>
		</div>
	);
};

export default RegisterUser;
