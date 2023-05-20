import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
        <div>
            {
                posts.map((post) => (
                    <div key={post._id}>
                        {
                            post.image?
                            <img src={post.image} style={{width: "100px"}} alt={post.postCaption}/>:
                            null
                        }
                        <p>{post.postCaption}</p>
                        </div>
                ))
            }
        </div>
    )
}

export default PostsByUser;