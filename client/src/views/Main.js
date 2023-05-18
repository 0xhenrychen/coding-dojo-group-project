import React from 'react';
import DisplayNav from '../components/DisplayNav';
import DisplayAllPosts from '../components/DisplayAllPosts';
import { BrowserRouter } from 'react-router-dom';

function Main() {
    return (
        <div>
            <DisplayAllPosts />
        </div>
    )
}

export default Main;