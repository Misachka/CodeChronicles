import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";
import Auth from '../utils/auth';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

export default function LoginPage() {
  const [username, setUsername] = useState(''); //empty to accept username input
  const [password, setPassword] = useState(''); //empty to accept password input
  const { setUserInfo } = useContext(UserContext); //uses context for auth
  const navigate = useNavigate();
  const [loginMutation, { loading, error }] = useMutation(LOGIN);

  //function for login
  const login = async (ev) => {
    ev.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: {
          email: username, //email is set as username
          password: password, //password is set as password
        },
      });

      //verifies user credentials
      const token = data.login.token;
      Auth.login(token);

      if (token) {
        navigate('/'); 
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Wrong credentials or login failed');
    }
  };
//takes input, sets the values, to login user 
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="e-mail"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button id="login-btn" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: Incorrect Password</p>}
    </form>
  );
}

