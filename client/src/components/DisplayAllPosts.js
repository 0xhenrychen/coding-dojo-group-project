// 5/17 - Henry - Display all posts function is working. Jessica is working on the React side but I wanted to include this code just in case I need it to test the backend/login and registration. We still need to do styling (Alexandra).

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const DisplayAllPosts = (props) => {
    const navigate = useNavigate()
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allposts')
            .then((response) => {
            console.log(response);
            setAllPosts(response.data)
            })
            .catch((error) => {
                console.log(error);
            }) 
    }, [])

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
                {
                    allPosts.map((post) => (
                            <div key={post._id} className="container_posts">
                                <p>Caption: {post.postCaption}</p>
                                <p>Type of activity: {post.postType}</p>

                                {
                                    post.image?
                                    <img src={post.image} style={{width: "100px"}}/>:
                                    <span> If no, then don't show anything here.</span>
                                }
                                <p><Link to = {`/posts/${post._id}`}>Details</Link> | <Link to = {`/posts/edit/${post._id}`}>Edit</Link></p>
                                <p>(Need to implement) Number of likes | Leave a comment</p>
                            </div>
                    ))
                }
            </div>
        </div>
    );
}

export default DisplayAllPosts;
