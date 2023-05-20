import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const DeleteButton = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [post, setPost] = useState(props.post);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedInUser`, {withCredentials: true})
            .then((response) => {
            console.log(response);
            setUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            }) 
    }, [])

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/deletepost/${id}`)
            .then((response) => {
                console.log(response);
                navigate('/home');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <div>
            {
                user._id === post.user_id?
                <p><Link onClick = {() => deleteHandler(post._id)}>Delete</Link> | <Link to={`/posts/edit/${post._id}`}>Edit</Link></p>:
                null
            }
        </div>
    )
}

export default DeleteButton;