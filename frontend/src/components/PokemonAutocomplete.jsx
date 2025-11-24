import { useState, useEffect, useRef } from "react";

function PokemonAutocomplete({ label }) {
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

    // function for capitalize selected pokemon
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
                setQuery(capitalize(p.name));
                setShow(false);
                setManualSelect(true);
              }}
            >
              {capitalize(p.name)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonAutocomplete