// 5/17 - Henry - Create one post function is working. Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate, Link} from 'react-router-dom';

const CreatePost = (props) => {
    const navigate = useNavigate()
    
    const [post, setPost] = useState({
            postCaption: "",
            postType: "",
            postRecommend: false,
            image: null
        })

    const [errors, setErrors] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    
    const changeHandler = (e) => {
        if(e.target.name === "postRecommend") {
            setPost({...post, postRecommend: !post.postRecommend})
        }
        else {
            setPost({...post, [e.target.name]: e.target.value})
        }
    }

    const imgHandler = (e) => {
        const imgSrc = URL.createObjectURL(e.target.files[0]);
        setPost({...post, [e.target.name]: imgSrc});
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/newpost', post)
            .then((res) => {
                console.log(res);
                navigate('/home');
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    }

    return (
        <div>
            <div>
                <form onSubmit = {submitHandler}>
                    <div>
                        <div>
                            <label htmlFor="post-caption">Caption:</label>
                            <textarea id="post-caption" rows="5" cols="20" name = "postCaption" onChange = {changeHandler} value = {post.postCaption} />
                            {
                                errors.postCaption ?
                                <p className = "text-danger">{errors.postCaption.message}</p> :
                                null
                            }
                        </div>
                        <div>
                            <label htmlFor="post-type">Type of activity:</label>
                            <select id="post-type" name = "postType" onChange = {changeHandler} value = {post.postType}>
                                <option value="">-- Select One --</option>
                                <option value="Hiking">Hiking</option>
                                <option value="Camping">Camping</option>
                                <option value="Backpacking">Backpacking</option>
                                <option value="Running">Running</option>
                                <option value="Biking">Biking</option>
                                <option value="Other">Other</option>
                            </select>
                            {
                                errors.postType ?
                                <p className = "text-danger">{errors.postType.message}</p> :
                                null
                            }
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
                        <input
                            type="file"
                            name="image"
                            onChange={imgHandler}
                        />
                        </div>
                        <div>
                            <label>Recommend this activity?</label>
                            <input type="checkbox" name="postRecommend" onChange = {changeHandler} value={post.postRecommend} />
                            {
                                errors.postRecommend ?
                                <p className = "text-danger">{errors.postRecommend.message}</p> :
                                null
                            }
                        </div>
                        <div>
                            <input type = "submit" value = "Create Post" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;