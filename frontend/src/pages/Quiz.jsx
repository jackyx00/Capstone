import { useEffect, useState } from "react";

function Quiz() {
  const [pokemon, setPokemon] = useState(null);
  const [choices, setChoices] = useState([]);
  const [coins, setCoins] = useState(0);
  const [feedback, setFeedback] = useState("");

  const baseURL = import.meta.env.VITE_BASE_URL;

  const savedUser = JSON.parse(localStorage.getItem("user"));
  const userId = savedUser?._id;

  useEffect(() => {
    if (savedUser?.pokecoins !== undefined) {
      setCoins(savedUser.pokecoins);
    }
    loadQuestion();
  }, []);

  async function loadQuestion() {
    const res = await fetch(`${baseURL}/quiz`);
    const data = await res.json();
    setPokemon(data);
    setChoices(data.choices);
    setFeedback("");
  }

  async function handleAnswer(choice) {
    let newCoins;
    if (choice === pokemon.name) {
      newCoins = (savedUser?.pokecoins ?? coins) + 1;
      setFeedback("Correct! +1 PokéCoin");
    } else {
      newCoins = Math.max(0, coins - 1);
      setFeedback("Wrong! -1 PokéCoin");
    }

    setCoins(newCoins);

    if (userId) {
      const res = await fetch(`${baseURL}/quiz/updateCoins`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, pokecoins: newCoins }),
      });

      const data = await res.json();

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setCoins(data.user.pokecoins);
      }
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
