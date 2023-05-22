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
				// console.log(err);
                console.log(err.response.data.message);
				setErrors(err.response.data.message);
			});
	};

	return (
		<div>
			<div className="logo-container">
				<img className="logo" src="/get-out-logo.png" alt="App Logo" />
			</div>
			<form onSubmit={submitHandler}>
				<div className="container">
					<h2>Login:</h2>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							onChange={changeHandler}
							value={user.email}
						/>
						{errors.email ? (
							<p className="text-danger">{errors.response.data.message}</p>
						) : null}
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							onChange={changeHandler}
							value={user.password}
						/>
						{errors.password ? (
							<p className="text-danger">{errors.response.data.message}</p>
						) : null}
					</div>
					<div>
						<input type="submit" value="Login" />
					</div>
				</div>
			</form>
			<p>
				Don't have an account? <Link to={"/register"}>Register</Link>
			</p>
		</div>
	);
};

export default LoginUser;
