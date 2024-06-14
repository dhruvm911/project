import {Route, Routes, Navigate, createBrowserRouter, RouterProvider} from 'react-router-dom';

import Main from './pages/Main';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Layout from "./pages/Splash/Splash"

// import Home from './pages/Home/Home.jsx';
// import PostDetail from './pages/PostDetail/PostDetail.jsx';
// import UserProfile from './pages/UserProfile/UserProfile.jsx';
// import Authors from './pages/Authors/Authors.jsx';
// import CreatePost from './pages/CreatePost/CreatePost.jsx';
// import CategoryPosts from './pages/CategoryPosts/CategoryPosts.jsx';
// import AuthorPosts from './pages/AuthorPosts/AuthorPosts.jsx';
// import Dashboard from './pages/Dashboard/Dashboard.jsx';
// import EditPost from './pages/EditPost/EditPost.jsx';
// import Logout from './pages/Logout/Logout.jsx';
// import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout/>,
//     errorElement: <ErrorPage/>,
//     children: [
//       {index: true, element: <Home/>},
//       {path: "posts/:id",element: <PostDetail/>},
//       {path: "signup",element: <Signup/>},
//       {path: "login",element: <Login/>},
//       {path: "profile/:id",element: <UserProfile/>},
//       {path: "authors",element: <Authors/>},
//       {path: "create",element: <CreatePost/>},
//       {path: "posts/categories/:category",element: <CategoryPosts/>},
//       {path: "posts/users/:id",element: <AuthorPosts/>},
//       {path: "myposts/:id",element: <Dashboard/>},
//       {path: "posts/:id/edit",element: <EditPost/>},
//       {path: "logout",element: <Logout/>}
//     ]
//   }
// ])

function App() {
  const user = localStorage.getItem("token")
  return (

    
    
    
    <Routes>/
      <Route path='*' element={<Layout />} />
      {user && <Route path='/' exact element={<Main/>} />}
      <Route path='/signup' exact element={<Signup/>} />
      <Route path='/login' exact element={<Login/>} />
      <Route path='/' exact element={<Navigate replace to="/*"/>} />
    </Routes>
  );
}

export default App;
