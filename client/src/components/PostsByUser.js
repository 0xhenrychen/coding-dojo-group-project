import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const PostsByUser = (props) => {
    const [user_id, setUser_id] = useState(props.user_id);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/postsbyuserid/' + user_id)
        .then((res) => {
            console.log(res);
            setPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <div className='user-posts'>
            {
                posts.map((post) => (
                    <div key={post._id}>
                        {
                            post.image?
                            <Link to={`/posts/${post._id}`}><img src={post.image} alt={post.postCaption}/></Link>:
                            <Link to={`/posts/${post._id}`}><div className='no-image-container'><p className='post-link'>{post.postCaption}</p></div></Link>
                        }
                        </div>
                ))
            }
        </div>
    )
}

export default PostsByUser;