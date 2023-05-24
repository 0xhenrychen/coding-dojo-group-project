import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./cssComponents/UserByPost.css";
import blank from "../blank-profile.jpg";

const UserByPost = (props) => {
	const [user_id, setUser_id] = useState(props.user_id);
	const [user, setUser] = useState({});
	const [userDisplay, setUserDisplay] = useState(props.userDisplay);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/user/" + user_id)
			.then((res) => {
				console.log(res);
				setUser(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div style={userDisplay}>
			{user.image ? (
				<img src={user.image} className="user-icon" />
			) : (
				<img src={blank} className="profile-icon" />
			)}
			<p>
				<Link to={`/user/${user._id}`}>{user.username}</Link>
			</p>
		</div>
	);
};

export default UserByPost;
