import React from 'react'

const DogDetails = props => {
  if (props.needBones) {
    return (<h1>Throw me a bone</h1>)
  } else {
    return (
      <div className='quadrant'>
        <h1>{props.userName}</h1>
        <p>{props.speak}</p>
      </div>
    )
  }
}

export default DogDetails
