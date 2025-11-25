import { useState } from "react";
import PokemonAutocomplete from "../components/PokemonAutocomplete";

function Trade() {
  const [offer, setOffer] = useState("");
  const [receive, setReceive] = useState("");

  const baseURL = import.meta.env.VITE_BASE_URL;

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const userId = savedUser?._id;

  if (!userId) {
    return (
      <div className="Header">
        <h2>Trade Pokémon</h2>
        <p>You must be logged in to post a trade.</p>

        <div style={{ marginTop: "20px" }}>
          <a href="/profile">
            <button>Login</button>
          </a>
        </div>
      </div>
    );
  }

  async function validatePokemonName(name) {
    const res = await fetch(`${baseURL}/pokemon?search=${name}`);
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

    await fetch(`${baseURL}/trade`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offerPokemon: finalOffer,
        receivePokemon: finalReceive,
        userId,
      }),
    });

    alert("Trade posted!");

    setOffer("");
    setReceive("");
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
