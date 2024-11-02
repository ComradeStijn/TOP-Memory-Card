/* eslint-disable react/prop-types */
export default function Card({pokemon}) {
  return (
    <div className="card">
      <img src={pokemon.imageURL} alt="image of a pokemon" />
    </div>
  )
}