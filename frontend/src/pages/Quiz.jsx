import { useEffect, useState } from "react";

function Quiz() {
  const [pokemon, setPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [coins, setCoins] = useState(0);
  const [feedback, setFeedback] = useState("");

  const port = import.meta.env.VITE_BACKEND_PORT;

  async function loadQuestion() {
    const res = await fetch(`http://localhost:${port}/quiz`);
    const data = await res.json();
    setPokemon(data);
    setChoices(data.choices);
    setFeedback("");
  }

  useEffect(() => {
    loadQuestion();
  }, []);

  function handleAnswer(choice) {
    if (choice === pokemon.name) {
      setCoins(coins + 1);
      setFeedback("Correct! +1 PokéCoin");
    } else {
      setCoins(Math.max(0, coins - 1));
      setFeedback("Wrong! -1 PokéCoin");
    }

    setTimeout(() => {
      loadQuestion();
    }, 1000);
  }

  if (!pokemon) return <h2 className="quiz-loading">Loading...</h2>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Who's That Pokémon?</h1>

      <h3 className="quiz-coins">PokéCoins: {coins}</h3>

      <img
        src={pokemon.sprite}
        alt="Who's That Pokémon?"
        className="quiz-image"
      />

      <div className="quiz-choices">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleAnswer(choice)}
            className="quiz-choice-btn"
          >
            {choice}
          </button>
        ))}
      </div>

      <h3 className="quiz-feedback">{feedback}</h3>
    </div>
  );
}

export default Quiz;