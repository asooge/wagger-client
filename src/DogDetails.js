import React from 'react'

const DogDetails = props => {
  if (props.needBones) {
    return (<h1>Throw me a bone</h1>)
  } else {
    return (
      <div className='quadrant'>
        <h1>{props.userName}</h1>
        <p>{props.speak}</p>
        <h3 style={{ display: 'inline-block' }}>Is it a match: </h3>
        <button onClick={props.nextDog}>Yes</button>
        <button onClick={props.nextDog}>No</button>
      </div>
    )
  }
}

export default DogDetails
