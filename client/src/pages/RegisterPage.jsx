import { useState } from "react";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";  
import { useMutation } from "@apollo/client";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [addUser, { loading, error }] = useMutation(ADD_USER);  

  async function register(ev) {
    ev.preventDefault();

    try {
      const { data } = await addUser({  
        variables: {
          firstName: username,
          lastName: "",
          email: username,
          password: password,
        },
      });

      const token = data.addUser.token;
      Auth.login(token);
      alert("Registration successful");
    } catch (err) {
      console.error("Registration failed", err);
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
      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
