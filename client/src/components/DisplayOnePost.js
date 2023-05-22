import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import UserByPost from '../components/UserByPost';
import DeleteButton from '../components/DeleteButton';

const DisplayOnePost = (props) => {
    const {id} = useParams();
    const [post, setPost] = useState({});
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/onepost/${id}`)
            .then((res) => {
                console.log(res.data);
                setPost(res.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // const deleteHandler = (id) => {
    //     axios.delete(`http://localhost:8000/api/deletepost/${id}`)
    //         .then((response) => {
    //             console.log(response);
    //             navigate('/home');
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    // }

        return (
        <div>
            <div>
                {
                    loaded?
                    <UserByPost user_id={post.user_id}/>:
                    <p>Post by: Loading...</p>
                }  
                {
                    post.image?
                    <img src={post.image} style={{width: "250px"}} alt={post.postCaption}/>:
                    null
                }
                <p>Caption: {post.postCaption}</p>
                <p>Type of activity: {post.postType}</p>
            </div>
            {
                loaded?
                <DeleteButton post={post} />:
                <p>Loading delete button...</p>
            }
        </div>
    );
}

export default DisplayOnePost;