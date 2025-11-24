import PokemonAutocomplete from "../components/PokemonAutocomplete";

function Trade() {

  return (
    <div className="Header">
      <h2>Trade Pokémon</h2>
      <p>Select the Pokémon you want to trade and the Pokémon you want in return.</p>

      <form>
        <PokemonAutocomplete
          label="Pokémon You Are Offering"
        />

        <PokemonAutocomplete
          label="Pokémon You Want to Receive"
        />
        <button type="submit">
          Create Trade Post
        </button>
      </form>
    </div>
  );
}

export default Trade