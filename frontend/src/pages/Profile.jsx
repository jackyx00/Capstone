import { useState, useEffect } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("none");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const port = import.meta.env.VITE_BACKEND_PORT;

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      loadProfile(parsed._id);
    }
  }, []);

  async function loadProfile(id) {
    const res = await fetch(`http://localhost:${port}/profile/${id}`);
    const data = await res.json();
    setUser(data);
  }

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch(`http://localhost:${port}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    });

    const data = await res.json();
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  if (!user) {
    return (
      <div className="profile-container">
        <h1>Profile</h1>

        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Register</button>

        {view === "login" && (
          <form onSubmit={handleLogin} className="auth-form">
            <input
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        )}

        {view === "register" && (
          <form onSubmit={handleRegister} className="auth-form">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
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
        )}
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>

      <p>
        <strong>Name:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>PokéCoins:</strong> {user.pokecoins}
      </p>

      <h2>Your Trades</h2>
      <div className="trade-list">
        {user.tradeHistory?.length > 0 ? (
          user.tradeHistory.map((t) => (
            <div key={t._id} className="trade-history-item">
              <div className="trade-poke">
                <img src={t.offerSprite} alt={t.offerPokemon} />
                <p>{t.offerPokemon}</p>
              </div>

              <div className="trade-arrow">➜</div>

              <div className="trade-poke">
                <img src={t.receiveSprite} alt={t.receivePokemon} />
                <p>{t.receivePokemon}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No trade history yet.</p>
        )}
      </div>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Profile;
