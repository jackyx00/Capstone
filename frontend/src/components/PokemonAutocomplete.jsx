import { useState, useEffect, useRef } from "react";

function PokemonAutocomplete({ label }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);

  const ref = useRef(null);

  // Search Pokémon names
  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();

    async function fetchNames() {
      try {
        const port = import.meta.env.VITE_BACKEND_PORT;
        const res = await fetch(
          `http://localhost:${port}/pokemon?search=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setSuggestions(data);
        setShow(true);
      } catch {}
    }

    fetchNames();
    return () => controller.abort();
  }, [query]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref}>
      <label>{label}</label>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.toLowerCase())}
        placeholder="Type Pokémon name..."
      />

      {show && suggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {suggestions.map((p) => (
            <div
              key={p.id}
              className="autocomplete-item"
              onClick={() => {
                setQuery(p.name);
                setShow(false);
              }}
            >
              {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonAutocomplete