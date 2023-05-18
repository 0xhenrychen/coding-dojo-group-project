import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './views/Main';
import LoginUser from './components/LoginUser';
import RegisterUser from './components/RegisterUser';
import DisplayOnePost from './components/DisplayOnePost';
import DisplayNav from './components/DisplayNav';
import CreatePost from './components/CreatePost';
import EditOnePost from './components/EditOnePost';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DisplayNav />
        <Routes>
          <Route element={(
              <>
                <DisplayNav />
              </>)}>
              <Route element={<Main />} path="/home" default />
              <Route element={<DisplayOnePost />} path="/posts/:id"/>
              <Route element={<EditOnePost />} path="/posts/edit/:id"/>
              <Route element={<CreatePost />} path="/post/new"/>
              <Route element={<UserProfile />} path="/user/:id"/>
          </Route>
          <Route element={<LoginUser />} path="/" />
          <Route element={<RegisterUser />} path="/register"/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
