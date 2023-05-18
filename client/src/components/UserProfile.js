import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Link, useNavigate} from 'react-router-dom';

const UserProfile = (props) => {
    const {id} = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8000/api/user/${id}')
            .then((response) => {
            console.log(response);
            setUser(response.data)
            })
            .catch((error) => {
                console.log(error);
            }) 
    }, [])

    return(
        <div>
            <div>
                {
                    user.image?
                    <img src={user.image}/>:
                    <p>You haven't uploaded a profile picture!</p>
                }
                <p>Number of posts placeholder</p>
                <p>Number of Followers placeholder</p>
                <p>Number of Following placeholder</p>
            </div>
            {/* Need to implement, make sure to put inline or flex styling
            {
                    user.posts.map((post) => (
                            <div key={post._id} className="container_posts">
                                {
                                    post.image?
                                    <img src={post.image} style={{width: "100px"}}/>:
                                    <span> If no, then don't show anything here.</span>
                                }
                            </div>
                    ))
                } */}
        </div>
    )
}

export default UserProfile;