import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { useState } from "react";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./store/UserContext";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import CreatePost from "./components/CreatePost";
import RegisterPage from "./pages/RegisterPage";
import EditPost from "./pages/EditPost";
// import PostPage from "./pages/PostPage";
import Logout from "./components/Logout";
import Header from "./components/common/header/Header";
import Editing from "./pages/Editing";

// Create an ApolloClient instance
const httpLink = createHttpLink({
  uri: "https://codechronicles2.onrender.com/graphql", // Replace with your GraphQL endpoint
  credentials: false,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer: ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <Header />
    <UserContextProvider>
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post" element={<EditPost />} />
          <Route path="editing/:postId" element={<Editing />} />
          {/* <Route path="/post" element={<PostPage />} /> */}
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </ApolloProvider>
    </UserContextProvider>
    </>
    
  );
}

export default App;
