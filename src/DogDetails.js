import React from 'react'
import Bones from './Bones'

const DogDetails = props => {
  if (props.needBones) {
    return (<Bones time={props.time}/>)
  } else {
    return (
      <div className='quadrant padding'>
        <h1>{props.userName}</h1>
        <p>{props.speak}</p>
        <h3 style={{ display: 'inline-block' }}>Is it a match: </h3>
        <button name='yes' onClick={props.nextDog}>Yes</button>
        <button name='no' onClick={props.nextDog}>No</button>
      </div>
    )
  }
}

export default DogDetails
