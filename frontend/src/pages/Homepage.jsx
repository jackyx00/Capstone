import { useEffect, useState } from "react";

function Homepage() {
  const [trades, setTrades] = useState([]);
  const [displayTrades, setDisplayTrades] = useState([]);

  const [page, setPage] = useState(1);
  const TRADES_PER_PAGE = 6;

  // sprite
  const [spriteCache, setSpriteCache] = useState({});

  // Load trades from backend
  useEffect(() => {
    async function loadTrades() {
      const port = import.meta.env.VITE_BACKEND_PORT;
      const res = await fetch(`http://localhost:${port}/trade`);
      const data = await res.json();
      setTrades(data);
    }
    loadTrades();
  }, []);

  // Pagination logic
  useEffect(() => {
    const start = (page - 1) * TRADES_PER_PAGE;
    const end = start + TRADES_PER_PAGE;
    setDisplayTrades(trades.slice(start, end));
  }, [page, trades]);

  // fetch sprites from db
  async function fetchSprite(name) {
    if (spriteCache[name]) return spriteCache[name];

    const port = import.meta.env.VITE_BACKEND_PORT;
    const res = await fetch(`http://localhost:${port}/pokemon/by-name/${name}`);
    const data = await res.json();

    const spriteUrl = data?.sprites?.official_artwork_front || null;

    setSpriteCache((prev) => ({ ...prev, [name]: spriteUrl }));
    return spriteUrl;
  }

  // fetch sprites for trades displayed
  useEffect(() => {
    displayTrades.forEach(async (t) => {
      await fetchSprite(t.offerPokemon);
      await fetchSprite(t.receivePokemon);
    });
  }, [displayTrades]);

  // Pagination buttons
  const totalPages = Math.ceil(trades.length / TRADES_PER_PAGE);

  return (
    <div className="pokedex-container">
      <h1 className="pokedex-title">PokéTrades</h1>
      <h2 className="pokedex-subtitle">Ongoing Trades</h2>

      {/* Trade Grid */}
      <div className="pokedex-grid">
        {displayTrades.map((t) => (
          <div key={t._id} className="pokedex-card">
            {/* Offer Pokémon */}
            <img
              src={spriteCache[t.offerPokemon]}
              alt={t.offerPokemon}
              className="pokedex-sprite"
            />
            <div className="pokedex-name">{t.offerPokemon}</div>

            <div className="trade-arrow">⇄</div>

            {/* Receive Pokémon */}
            <img
              src={spriteCache[t.receivePokemon]}
              alt={t.receivePokemon}
              className="pokedex-sprite"
            />
            <div className="pokedex-name">{t.receivePokemon}</div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pokedex-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={
              page === i + 1 ? "pokedex-page-btn active" : "pokedex-page-btn"
            }
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
