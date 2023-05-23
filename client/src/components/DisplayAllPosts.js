// 5/17 - Henry - Display all posts function is working. Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserByPost from "../components/UserByPost";
import "./cssComponents/DisplayAllPosts.css";

const DisplayAllPosts = (props) => {
	const navigate = useNavigate();
	const [allPosts, setAllPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8000/api/allposts")
			.then((response) => {
				console.log(response);
				setAllPosts(response.data);
				setFilteredPosts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const filterPosts = (e) => {
		if (e.target.value === "") {
			setFilteredPosts(allPosts);
		} else {
			setFilteredPosts(
				allPosts.filter((post) => post.postType === e.target.value)
			);
		}
	};

	return (
		<div>
			<div className="posts-container">
				<label htmlFor="filter" className="filter-label">
					Filter Posts:
				</label>
				<select name="filter" onChange={filterPosts} className="filter-select">
					<option value="">-- Select One --</option>
					<option value="Hiking">Hiking</option>
					<option value="Camping">Camping</option>
					<option value="Backpacking">Backpacking</option>
					<option value="Running">Running</option>
					<option value="Biking">Biking</option>
					<option value="Other">Other</option>
				</select>
				{filteredPosts.map((post) => (
					<div key={post._id} className="container-posts">
						<UserByPost user_id={post.user_id} />
						{post.image ? (
							<img src={post.image} style={{ width: "100px" }} />
						) : null}
						<p>{post.postCaption}</p>
						<p>Type of activity: {post.postType}</p>
						<p>
							<Link to={`/posts/${post._id}`}>Details</Link>
						</p>
						<p>(Need to implement) Number of likes | Leave a comment</p>
					</div>
				))}
			</div>
			<Link to={"/post/new"} className="create-post-link">
				+ Create new post
			</Link>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#FDEBD0"
					fill-opacity="0.5"
					d="M0,128L48,133.3C96,139,192,149,288,170.7C384,192,480,224,576,224C672,224,768,192,864,197.3C960,203,1056,245,1152,240C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
				></path>
			</svg>
		</div>
	);
};

export default DisplayAllPosts;
