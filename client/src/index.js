import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import './index.css';
// import App from './App';
import { Routes, Route, RouterProvider } from 'react-router-dom';


import Signup from './pages/Signup/index.jsx';
import Login from './pages/Login/index.jsx';
import Layout from "./components/Layout.jsx"

import Home from './pages/Home/Home.jsx';
import PostDetail from './pages/PostDetail/PostDetail.jsx';
import UserProfile from './pages/UserProfile/UserProfile.jsx';
import Authors from './pages/Authors/Authors.jsx';
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import CategoryPosts from './pages/CategoryPosts/CategoryPosts.jsx';
import AuthorPosts from './pages/AuthorPosts/AuthorPosts.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import EditPost from './pages/EditPost/EditPost.jsx';
import DeletePost from './pages/DeletePost/DeletePost.jsx';
import Logout from './pages/Logout/Logout.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: "posts/:id",element: <PostDetail/>},
      {path: "signup",element: <Signup/>},
      {path: "login",element: <Login/>},
      {path: "profile/:id",element: <UserProfile/>},
      {path: "authors",element: <Authors/>},
      {path: "create",element: <CreatePost/>},
      {path: "posts/categories/:category",element: <CategoryPosts/>},
      {path: "posts/users/:id",element: <AuthorPosts/>},
      {path: "myposts/:id",element: <Dashboard/>},
      {path: "posts/:id/edit",element: <EditPost/>},
      {path: "posts/:id/delete",element: <DeletePost/>},
      {path: "logout",element: <Logout/>}
    ]
  }
])



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
    
//   </React.StrictMode>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>
);

