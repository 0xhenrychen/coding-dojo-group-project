import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import UserByPost from '../components/UserByPost';

const DisplayAllPosts = (props) => {
    const navigate = useNavigate()
    const [allPosts, setAllPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/allposts')
            .then((response) => {
            console.log(response);
            setAllPosts(response.data)
            setFilteredPosts(response.data)
            })
            .catch((error) => {
                console.log(error);
            }) 
    }, [])

    const filterPosts = (e) => {
        if(e.target.value === ""){
            setFilteredPosts(allPosts);
        } else {
        setFilteredPosts(allPosts.filter(post => post.postType === e.target.value));
        }
    }
    
    return (
        <div>
            <div style={{height: "65vh", overflow: "auto"}}>
                <label htmlFor="filter">Filter Posts:</label>
                <select name="filter" onChange = {filterPosts}>
                    <option value="">-- Select One --</option>
                    <option value="Hiking">Hiking</option>
                    <option value="Camping">Camping</option>
                    <option value="Backpacking">Backpacking</option>
                    <option value="Running">Running</option>
                    <option value="Biking">Biking</option>
                    <option value="Other">Other</option>
                </select>
                {
                    filteredPosts.map((post) => (
                            <div key={post._id} className="container_posts">
                                <UserByPost user_id={post.user_id} />
                                {
                                    post.image?
                                    <img src={post.image} style={{width: "250px"}}/>:
                                    null
                                }
                                <p>Date: {post.createdAt}</p>
                                <p>{post.postCaption}</p>
                                <p>Type of activity: {post.postType}</p>
                                <p><span>Recommend this activity? </span>
                                {
                                    post.postRecommend?
                                    <span>Yes</span>:
                                    <span>No</span>
                                }</p>
                                <p><Link to = {`/posts/${post._id}`}>Details</Link></p>
                                <p>Number of likes | Leave a comment</p>
                            </div>
                    ))
                }
            </div>
            <Link to={'/post/new'}>+ Create new post</Link>
        </div>
    );
}

export default DisplayAllPosts;
