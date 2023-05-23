// 5/17 - Henry - Added a navigation component to show up at the top of every other component, i.e. "page". Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./cssComponents/DisplayNav.css";

const DisplayNav = (props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/loggedInUser`, { withCredentials: true })
			.then((response) => {
				console.log(response);
				setUser(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	});

	const logout = () => {
		axios
			.post("http://localhost:8000/api/logout", {}, { withCredentials: true })
			.then((res) => {
				navigate("/");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (location.pathname === "/" || location.pathname === "/register") {
		return null;
	}

	return (
		<div>
			<div className="nav-container">
				<img className="nav-logo" src="/get-out-logo.png" alt="App Logo" />

				<p className="nav-text">
					Your next outdoor adventure awaits. Share it with your family and
					friends.
				</p>
				<p className="nav-links">
					<Link to={"/home"}>Home</Link> | <Link to="/post/new">New Post</Link>{" "}
					| <Link to={`/profile/${user._id}`}>Profile</Link> |{" "}
					<span onClick={logout}>Logout</span>
				</p>
			</div>
		</div>
	);
};

export default DisplayNav;
