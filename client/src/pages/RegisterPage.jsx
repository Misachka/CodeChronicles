import { useState } from "react";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const [addUser, { loading, error }] = useMutation(ADD_USER);

  async function register(ev) {
    ev.preventDefault();

    try {
      const { data } = await addUser({
        variables: {
          username: username,
          email: email,
          password: password,
        },
      });

      console.log("Data:", data);
      const token = data.addUser.token;
      Auth.login(token);
      alert("Registration successful");
      navigate("/")
    } catch (err) {
      console.error("Registration failed", err);
      console.log("Error: ", err);
      alert("Registration failed");
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
