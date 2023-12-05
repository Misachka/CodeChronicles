import { useState } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import { UserContextProvider } from './pages/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import Layout from './pages/Layout';
import CreatePost from './pages/CreatePost';
import RegisterPage from './pages/RegisterPage';
import EditPost from './pages/EditPost';
import PostPage from './pages/PostPage';


function App() {
  const [count, setCount] = useState(0);

  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;

