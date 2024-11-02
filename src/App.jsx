const POKEMON_COUNT = 151;
import { useEffect, useState } from "react";

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

  return (
    <>
    
    </>
  );
}

async function fetchPokemonImage(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    const imageURL = result.sprites.front_default;
    const pokemonName = result.name;
    return {
      id: id,
      name: pokemonName,
      imageURL: imageURL,
    };
  } catch (error) {
    console.log(error.message);
  }
}

function generatePokemonIDs(count) {
  const results = [];

  while (results.length < count) {
    const id = Math.floor(Math.random() * POKEMON_COUNT) + 1;
    if (!results.includes(id)) {
      results.push(id);
    }
  }
  return results;
}
