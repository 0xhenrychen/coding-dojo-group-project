import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserByPost from "../components/UserByPost";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "./LikeButton";
import "./cssComponents/DisplayOnePost.css";

const DisplayOnePost = (props) => {
	const { id } = useParams();
	const [post, setPost] = useState({});
	const [loaded, setLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`http://localhost:8000/api/onepost/${id}`)
			.then((res) => {
				console.log(res.data);
				setPost(res.data);
				setLoaded(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const userDisplay = {
		marginTop: "20px",
	};

	return (
		<div>
			<div className="display-container">
				{loaded ? (
					<UserByPost user_id={post.user_id} userDisplay={userDisplay} />
				) : (
					<p>Post by: Loading...</p>
				)}
				{post.image ? (
					<img
						src={post.image}
						style={{ width: "250px" }}
						alt={post.postCaption}
					/>
				) : null}
				<p>{post.postCaption}</p>
				<p>Type of activity: {post.postType}</p>
				<LikeButton />
			</div>
			{loaded ? <DeleteButton post={post} /> : <p>Loading delete button...</p>}
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

export default DisplayOnePost;
