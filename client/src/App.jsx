import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import { UserContextProvider } from "./store/UserContext";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./components/CreatePost";
import RegisterPage from "./pages/RegisterPage";
import EditPost from "./pages/EditPost";

// import Pages 
import Logout from "./components/Logout";
import Header from "./components/common/header/Header";
import Editing from "./pages/Editing";
import Footer from "./components/Footer";


// Create an ApolloClient instance
const httpLink = createHttpLink({
  uri: "https://codechronicles2.onrender.com/graphql", 
  credentials: false,
});

//authentication link to attach the authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token"); //authentication token from local storage
  // Attach the token to the headers
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer: ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenate the authentication and HTTP links
  cache: new InMemoryCache(),
  
});

//routes for pages
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
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </ApolloProvider>
    </UserContextProvider>
    <Footer />
    </>
    
  );
}

export default App;