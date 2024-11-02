export function alreadyClicked(pokemons, id) {
  const item = pokemons.find((element) => element.id === id);
  return item.isClicked;
}

export function clickPokemon(pokemons, id) {
  return pokemons.map(pokemon => {
    if (pokemon.id === id) {
      return { ...pokemon, isClicked: true}
    } else {
      return pokemon;
    }
  })
}
