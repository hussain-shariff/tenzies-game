import React from 'react'

export default function Die(props){
    let styles = {
        backgroundColor: props.isHeld? "#59E391" : "white"
    }
  return (
    <div>
        <button 
            style={ styles }
            className='die-btn'
            onClick={()=>props.buttonSelected(props.id)}
            >
            {props.value}
        </button>
    </div>
  )
}

// let time = 0;

// setInterval(setTime, 1000)

// function setTime(){
//     time++
// }

// console.log(time);  
