import { useState } from "react";
import PokemonAutocomplete from "../components/PokemonAutocomplete";

function Trade() {
  const [offer, setOffer] = useState("");
  const [receive, setReceive] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(offer, receive)
    // making sure input not empty
    if (!offer || !receive) {
      alert("Please select both Pokémon!");
      return;
    }

    const port = import.meta.env.VITE_BACKEND_PORT;

    await fetch(`http://localhost:${port}/trade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerPokemon: offer,
        receivePokemon: receive,
      }),
    });

    alert("Trade posted!");
  };

  return (
    <div className="Header">
      <h2>Trade Pokémon</h2>
      <p>
        Select the Pokémon you want to trade and the Pokémon you want in return.
      </p>

      <form onSubmit={handleSubmit}>
        <PokemonAutocomplete
          label="Pokémon You Are Offering"
          onSelect={(p) => setOffer(p.name)}
        />

        <PokemonAutocomplete
          label="Pokémon You Want to Receive"
          onSelect={(p) => setReceive(p.name)}
        />
        <button type="submit">Post Trade</button>
      </form>
    </div>
  );
}

export default Trade;
