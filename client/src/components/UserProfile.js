import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostsByUser from "../components/PostsByUser";
import "./cssComponents/UserProfile.css";

const UserProfile = (props) => {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/user/${id}`)
			.then((response) => {
				console.log(response);
				setUser(response.data);
				setLoaded(true);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<div>
				{user.image ? (
					<img src={user.image} style={{ width: "200px" }} />
				) : (
					<p>You haven't uploaded a profile picture!</p>
				)}
				<p>{user.username}</p>
				<p>Number of posts placeholder</p>
				<p>Number of Followers placeholder</p>
				<p>Number of Following placeholder</p>
				{loaded ? <PostsByUser user_id={user._id} /> : null}
			</div>
		</div>
	);
};

export default UserProfile;
