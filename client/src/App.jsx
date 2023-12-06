import { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './pages/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import CreatePost from './pages/CreatePost';
import RegisterPage from './pages/RegisterPage';
import EditPost from './pages/EditPost';
import PostPage from './pages/PostPage';


function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (isLoggedIn) {
    return (
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Layout isLoggedIn={isLoggedIn}/>} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </Router>
      </UserContextProvider>
    );
  } else {
    return (
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostPage />} /> */}
          </Routes>
        </Router>
      </UserContextProvider>
    );
  }

  
}

export default App;

