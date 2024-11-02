const POKEMON_COUNT = 151;


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
      isPicked: false,
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

export {generatePokemonIDs, fetchPokemonImage}