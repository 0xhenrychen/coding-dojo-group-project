import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cssComponents/CreatePost.css";

const CreatePost = (props) => {
	const navigate = useNavigate();

	const [post, setPost] = useState({
		postCaption: "",
		postType: "",
		postRecommend: false,
		image: null,
	});

	const [errors, setErrors] = useState({});
	const [selectedImage, setSelectedImage] = useState(null);

	const changeHandler = (e) => {
		if (e.target.name === "postRecommend") {
			setPost({ ...post, postRecommend: !post.postRecommend });
		} else {
			setPost({ ...post, [e.target.name]: e.target.value });
		}
	};

	const imgHandler = (e) => {
		const imgSrc = URL.createObjectURL(e.target.files[0]);
		setPost({ ...post, [e.target.name]: imgSrc });
	};

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(post.postCaption);
		axios
			.post("http://localhost:8000/api/newpost", post, {
				withCredentials: true,
			})
			.then((res) => {
				console.log(res);
				navigate("/home");
			})
			.catch((err) => {
				console.log(err.response.data.errors);
				setErrors(err.response.data.errors);
			});
	};

	return (
		<div>
			<div className="create-post-container">
				<form onSubmit={submitHandler}>
					<div>
						<div>
							<label htmlFor="postCaption">Caption:</label>
							<textarea
								id="post-caption"
								rows="5"
								cols="20"
								name="postCaption"
								onChange={changeHandler}
								value={post.postCaption}
							/>
							{errors.postCaption ? (
								<p className="text-danger">{errors.postCaption.message}</p>
							) : null}
						</div>
						<div>
							<label htmlFor="post-type">Type of activity:</label>
							<select
								id="post-type"
								name="postType"
								onChange={changeHandler}
								value={post.postType}
							>
								<option value="">-- Select One --</option>
								<option value="Hiking">Hiking</option>
								<option value="Camping">Camping</option>
								<option value="Backpacking">Backpacking</option>
								<option value="Running">Running</option>
								<option value="Biking">Biking</option>
								<option value="Other">Other</option>
							</select>
							{errors.postType ? (
								<p className="text-danger">{errors.postType.message}</p>
							) : null}
						</div>
						<div>
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
							<input type="file" name="image" onChange={imgHandler} />
						</div>
						<div>
							<label>Recommend this activity?</label>
							<input
								type="checkbox"
								name="postRecommend"
								onChange={changeHandler}
								value={post.postRecommend}
							/>
							{errors.postRecommend ? (
								<p className="text-danger">{errors.postRecommend.message}</p>
							) : null}
						</div>
						<div>
							<input type="submit" value="Create Post" />
						</div>
					</div>
				</form>
			</div>
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

export default CreatePost;
