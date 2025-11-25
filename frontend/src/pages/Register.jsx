import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const port = import.meta.env.VITE_BACKEND_PORT;

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password })
    });

    const data = await res.json();
    setMsg(data.error || data.message);
  }

  return (
    <div className="register-container">
      <h1>Create Account</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <p className="register-msg">{msg}</p>
    </div>
  );
}

export default Register;