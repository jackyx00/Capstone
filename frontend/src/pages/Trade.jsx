import { useState } from "react";
import PokemonAutocomplete from "../components/PokemonAutocomplete";

function Trade() {
  const [offer, setOffer] = useState("");
  const [receive, setReceive] = useState("");

  const port = import.meta.env.VITE_BACKEND_PORT;
  
  const savedUser = JSON.parse(localStorage.getItem("user"));
  const userId = savedUser?._id;

  async function validatePokemonName(name) {
    const res = await fetch(`http://localhost:${port}/pokemon?search=${name}`);
    const data = await res.json();

    return (
      data.find((p) => p.name.toLowerCase() === name.toLowerCase()) || null
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validOffer = await validatePokemonName(offer);
    const validReceive = await validatePokemonName(receive);
    if (!validOffer || !validReceive) {
      let message = "Invalid Pokémon names:\n";

      if (!validOffer) message += `- "${offer}" is not valid\n`;
      if (!validReceive) message += `- "${receive}" is not valid\n`;

      alert(message);
      return;
    }

    const finalOffer = validOffer.name;
    const finalReceive = validReceive.name;

    await fetch(`http://localhost:${port}/trade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerPokemon: finalOffer,
        receivePokemon: finalReceive,
        userId
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
          value={offer}
          onChange={setOffer}
        />

        <PokemonAutocomplete
          label="Pokémon You Want to Receive"
          value={receive}
          onChange={setReceive}
        />
        <button type="submit">Post Trade</button>
      </form>
    </div>
  );
}

export default Trade;
