/* eslint-disable react/prop-types */
import './controls.css'

export default function Controls({ score, highscore, newGame }) {
  return (
    <div className="control-container">
      <button className='new-game-btn' onClick={newGame}>New Game</button>
      <div className="counter">Score: <br />{score}</div>
      <div className="counter">Highscore: <br />{highscore}</div>
    </div>
  )
}