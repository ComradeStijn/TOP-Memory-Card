import { useEffect, useState } from "react";
import { generatePokemonIDs, fetchPokemonImage } from "./assets/pokemonFetch";
import "./App.css";
import Card from "./components/Card";

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      const generatedIDs = generatePokemonIDs(10);
      const fetchPromises = generatedIDs.map((id) => fetchPokemonImage(id));

      const results = await Promise.all(fetchPromises);
      setPokemons(() => results.filter(Boolean));
    }

    fetchAll();
  }, []);

  function pokeShuffler() {
    setPokemons(() => [...pokemons.sort(() => Math.random() - 0.5)]);
  }



  return (
    <main id="root-container">
      <div className="card-container">
        {pokemons.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <button onClick={pokeShuffler}>Shuffle</button>
    </main>
  );
}

