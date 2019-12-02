import React from 'react'

const imageStyle = {
  height: '268px',
  maxWidth: '478px',
  margin: 'auto'
}

const ShowDog = props => {
  if (props.needBones) {
    return (
      <div className = 'quadrant'>
        <img src={props.currentDog} style={imageStyle}/>
        <button onClick={props.nextDog}>next</button>
      </div>
    )
  } else {
    return (
      <div className = 'quadrant'>
        <img src={props.seeWagger} style={imageStyle} />
        <button onClick={props.nextDog}>next</button>
      </div>
    )
  }
}

export default ShowDog
