import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import Auth from '../utils/auth';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();


  const [loginMutation, { loading, error }] = useMutation(LOGIN);

  const login = async (ev) => {
    ev.preventDefault();

    try {
      const { data } = await loginMutation({
        variables: {
          email: username,
          password: password,
        },
      });

      const token = data.login.token;
      Auth.login(token)
      if (token) {
        navigate('/')
      }
    } catch (err) {
      console.error('Login failed:', err);
      alert('Wrong credentials or login failed');
    }
  };

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
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: Incorrect Password</p>}
    </form>
  );
}
