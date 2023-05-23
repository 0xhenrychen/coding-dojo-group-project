// 5/17 - Henry - This is the component for an existing user to log in. Confirmed it's working. Jessica, please use as you see fit.

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./cssComponents/LoginUser.css";

const LoginUser = (props) => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});

	const changeHandler = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8000/api/login", user, { withCredentials: true })
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
				<div className="login-container">
					<h2>Login:</h2>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							onChange={changeHandler}
							value={user.email}
							className="login-input"
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
							className="login-input"
						/>
						{errors.password ? (
							<p className="text-danger">{errors.password.message}</p>
						) : null}
					</div>
					<div>
						<input type="submit" value="Login" className="login-btn" />
					</div>
				</div>
			</form>
			<p className="register-link">
				Don't have an account? <Link to={"/register"}>Register</Link>
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

export default LoginUser;
