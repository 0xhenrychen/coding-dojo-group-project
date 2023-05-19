// 5/17 - Henry - Display one post function is working. Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const DisplayOnePost = (props) => {
    const {id} = useParams()
    const [post, setPost] = useState({})
    const navigate = useNavigate()
    
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

    const deleteHandler = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/deletepost/${id}`)
            .then((response) => {
                console.log(response);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
            })
    }

        return (
        <div>
            <div>
                {
                    post.image?
                    <img src={post.image} style={{width: "250px"}}/>:
                    null
                }
                <p>Caption: {post.postCaption}</p>
                <p>Type of activity: {post.postType}</p>
            </div>
            <div>
                    <Link onClick = {() => deleteHandler(post._id)}>Delete</Link>
            </div>
        </div>
    );
}

export default DisplayOnePost;