import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';

const EditOnePost = (props) => {
    const navigate = useNavigate()
    const {id} = useParams()
    
    const [post, setPost] = useState({
        postCaption: "",
        postType: "",
        postRecommend: false
    })

    const [errors, setErrors] = useState({})
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Henry's version of changeHandler with conditional logic for the postRecommend toggle.
    const changeHandler = (e) => {
        if(e.target.name === "postRecommend") {
            setPost({...post, postRecommend: !post.postRecommend})
        }
        else {
            setPost({...post, [e.target.name]: e.target.value})
        }
    }

    // Jessica's version of changeHandler with no conditional logic for the postRecommend toggle. Up to the team if we want to display the recommended info.
    // const changeHandler = (e) => {
    //     setPost({...post, [e.target.name]:e.target.value})
    // }

    const imgHandler = (e) => {
        const imgSrc = URL.createObjectURL(e.target.files[0]);
        setPost({...post, [e.target.name]: imgSrc});
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/onepost/${id}`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/updatepost/${id}`, post)
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
                            <input type = "submit" value = "Update Post" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditOnePost;