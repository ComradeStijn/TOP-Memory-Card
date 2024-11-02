import { useEffect, useState } from "react";
import { generatePokemonIDs, fetchPokemonImage } from "./assets/pokemonFetch";
import "./App.css";
import Card from "./components/Card";
import Controls from "./components/Controls";
import { alreadyClicked, clickPokemon } from "./assets/game";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [gameover, setGameover] = useState(false);
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  useEffect(() => {
    fetchAll().then((results) => setPokemons(() => results.filter(Boolean)));
  }, []);

  function pokeShuffler() {
    setPokemons((prev) => [...prev.sort(() => Math.random() - 0.5)]);
  }

  function resetGame() {
    fetchAll().then((results) => setPokemons(() => results)).then(() => setGameover(() => false));
    setScore(() => 0);
  }

  function handleClick(id) {
    const prevClicked = alreadyClicked(pokemons, id);
    console.log(prevClicked);
    if (prevClicked) {
      if (score > highscore) {
        setHighscore(score);
      }
      setGameover(true);
    } else {
      setPokemons((prev) => {
        const updatedPokemons = clickPokemon(prev, id);
        return updatedPokemons;
      });
      setScore((prev) => prev + 1);
      pokeShuffler();
    }
  }


  return (
    <main id="root-container">
      <div className={`card-container ${gameover ? 'gameover' : ""}`}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} handleClick={handleClick} />
        ))}
      </div>
      <Controls score={score} highscore={highscore} newGame={resetGame} />
    </main>
  );
}

async function fetchAll() {
  const generatedIDs = generatePokemonIDs(10);
  const fetchPromises = generatedIDs.map((id) => fetchPokemonImage(id));

  return await Promise.all(fetchPromises);
}
