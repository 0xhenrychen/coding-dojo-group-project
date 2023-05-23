import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PostsByUser from "../components/PostsByUser";
import "./cssComponents/UserProfile.css";
import blank from '../blank-profile.jpg';

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
			<div className="profile-top">
				<div>
					{user.image ? (
						<img src={user.image} className="profile-pic" />
					) : (
						<img src={blank} className="profile-pic" />
					)}
				</div>
				<div>
					<p><strong>{user.username}'s Profile</strong></p>
					<p>2 Posts</p>
					<p>8 Followers</p>
					<p>25 Following</p>
				</div>
			</div>
				{loaded ? <PostsByUser user_id={user._id} /> : null}
		</div>
	);
};

export default UserProfile;
