import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { useState } from 'react';
import { setContext } from "@apollo/client/link/context";
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
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';

// Create an ApolloClient instance
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer: ${token}` : "",
    },
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [count, setCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (isLoggedIn) {
    return (
      <UserContextProvider>
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route path='/' element={<Layout isLoggedIn={isLoggedIn} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/post/:id" element={<PostPage />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Logout" element={<Logout />} />
            </Routes>
          </Router>
        </ApolloProvider>
      </UserContextProvider>
    );
  } else {
    return (
      <UserContextProvider>
        <ApolloProvider client={client}>
          <Router>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/post/:id" element={<PostPage />} /> */}
            </Routes>
          </Router>
        </ApolloProvider>
      </UserContextProvider>
    );
  }
}

export default App;
