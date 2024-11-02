/* eslint-disable react/prop-types */
export default function Card({pokemon, handleClick}) {
  return (
    <div className="card" onClick={() => handleClick(pokemon.id)}>
      <img src={pokemon.imageURL} alt="image of a pokemon" />
    </div>
  )
}