import { useState, useEffect, useRef } from "react";

function PokemonAutocomplete({ label, value, onChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [manualSelect, setManualSelect] = useState(false);

  const ref = useRef(null);

  const baseURL = import.meta.env.VITE_BASE_URL;

  // Search Pokémon names
  useEffect(() => {
    // no refetch if user select
    if (manualSelect) {
      return;
    }

    if (value.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    async function fetchNames() {
      try {
        const res = await fetch(
          `${baseURL}/pokemon?search=${value}`
        );
        const data = await res.json();
        setSuggestions(data);
        setShow(true);
      } catch (e) {
        console.error(e);
      }
    }

    fetchNames();
  }, [value, manualSelect]);

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
        value={value}
        onChange={(e) => {
          setManualSelect(false);
          onChange(e.target.value);
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
                setManualSelect(true);
                onChange(p.name);
                setShow(false);
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

export default PokemonAutocomplete;
