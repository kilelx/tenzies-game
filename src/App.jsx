import React, { useState } from 'react'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Dice from './components/Dice'
import './App.css'

function App() {

  const [dice, setDice] = React.useState(generateAllDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allEquals = dice.every(die => dice[0].value === die.value);
    const allHeld = dice.every(die => die.isHeld);

    (allEquals && allHeld) ?
      setTenzies(prevTenzies => !prevTenzies) :
      setTenzies(false)

  }, [dice])

  function generateAllDice() {

    const newDice = [];
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }

    return newDice;
  }

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      key: nanoid(),
      isHeld: false
    }
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(dice => {
        return dice.key === id ?
          {...dice, isHeld: !dice.isHeld} :
          dice
      })
    )
  }

  const diceElements = dice.map((die) => {
    return (
      <Dice
        value = {die.value}
        key = {die.key}
        isHeld = {die.isHeld}
        holdDice = {() => holdDice(die.key)}
      />
    )
  })

  function rollDice() {
    if(tenzies) {
      setDice(generateAllDice)
    } else {
      setDice(prevDice => prevDice.map(dice => {
        return (
          dice.isHeld ?
          dice :
          generateNewDice()
        )
      }))
    }
  }

  return (
    <div className="App">
      {tenzies && <Confetti/>}
      <div className='card'>
        <h1>Tenzies game</h1>
        <p>Click to roll the dice, save them and get them all equals!</p>
        <div className='dice--container'>
          {diceElements}
        </div>
        <button onClick={rollDice} className="btn">{tenzies ? "Play again" : "Roll"}</button>
      </div>
    </div>
  )
}

export default App