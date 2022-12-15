import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = React.useState(getRandomArray())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)

  let dieElements = dice.map(
    (num)=> <Die value = {num.value} 
                key = { num.id }
                id = { num.id }
                isHeld = { num.isHeld }
                buttonSelected = { buttonFixed }/>)

  React.useEffect(()=>{
    let val = dice[0].value;
    const checkAllHeld = dice.every((die)=> die.isHeld);
    const checkAllValSame = dice.every((die)=> val === die.value);
    if (checkAllHeld && checkAllValSame){
      setTenzies(true)
      console.log("won");
    }
  }, [dice])
  


  function getDie(){
    let randNum = Math.ceil(Math.random()*6)
    return {
      value : randNum,
      isHeld : false,
      id : nanoid()
    }
  }

  function getRandomArray(){
    let dieNumbersArray = []
    for (let index = 0; index < 10; index++) {
      dieNumbersArray.push(getDie())
    }
    return dieNumbersArray
  }                                                  
  function buttonFixed(id){
    setDice(prevDice=>{
      return prevDice.map((die)=>{
        return die.id === id? {...die, isHeld : !die.isHeld} : die
      })
    })
  }

  function rollDie(){
    if (tenzies){
      setRolls(0)
      setTenzies(false)
      setDice(getRandomArray)
    }
    else{
      setRolls(prevRoll=>prevRoll+1)
      setDice(prevDice=>{
        return prevDice.map((die)=>{
          return die.isHeld? die : getDie()
        })
      })
    }
  }
  return (
    <div className="App">
      {tenzies? <Confetti/> : ''}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <p>Number of Rolls: {rolls}</p>
      <div className="die-container">
        { dieElements }
      </div>
      <button className="run-btn" onClick={rollDie}>{tenzies? "New Game" : "Run"}</button>
    </div>
  );
}

export default App;
