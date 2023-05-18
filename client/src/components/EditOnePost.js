// 5/17 - Henry - Edit one post function is working. Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

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
    
    const changeHandler = (e) => {
        setPost({...post, [e.target.name]:e.target.value})
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
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            })
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {
                navigate('/')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div>
                <p><Link to="/posts/all">Home</Link> <Link to='/post/new'>New post</Link> <Link onClick={logout}>Logout</Link></p>
            </div>
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
                            <p>Need to add upload image feature later.</p>
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