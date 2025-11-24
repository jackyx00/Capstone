import { useState, useEffect, useRef } from "react";

function PokemonAutocomplete({ label, onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [manualSelect, setManualSelect] = useState(false);

  const ref = useRef(null);

  // Search Pokémon names
  useEffect(() => {
    // no refetch if user select
    if (manualSelect) {
      return;
    }

    if (query.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    async function fetchNames() {
      try {
        const port = import.meta.env.VITE_BACKEND_PORT;
        const res = await fetch(
          `http://localhost:${port}/pokemon?search=${query}`
        );
        const data = await res.json();
        setSuggestions(data);
        setShow(true);
      } catch(e) {
        console.error(e);
      }
    }

    fetchNames();
  }, [query, manualSelect]);

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
    <div className="autocomplete-wrapper" ref={ref}>
      <label className="autocomplete-label">{label}</label>

      <input
        className="autocomplete-input"
        type="text"
        value={query}
        onChange={(e) => {
            setManualSelect(false);
            setQuery(e.target.value);
        }}
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
                setManualSelect(true);
                onSelect(p);
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonAutocomplete