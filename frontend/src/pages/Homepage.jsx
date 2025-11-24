import { useEffect, useState } from "react";

function Homepage() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function loadTrades() {
      const port = import.meta.env.VITE_BACKEND_PORT;
      const res = await fetch(`http://localhost:${port}/trade`);
      const data = await res.json();
      setTrades(data);
    }
    loadTrades();
  }, []);

  return (
    <div className="Header">
      <h1 style={{ textAlign: 'center' }}>Pokémon Trade</h1>
      <h2>Ongoing Trades</h2>
      <hr />
      {trades.map((t) => (
        <div key={t._id} className="allTrades">
          <p><strong>{t.offerPokemon}</strong> for {t.receivePokemon}</p>
        </div>
      ))}
    </div>
  );
}

export default Homepage;
