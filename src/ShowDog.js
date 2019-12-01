import React from 'react'

const imageStyle = {
  height: '268px',
  maxWidth: '478px',
  margin: 'auto'
}

const ShowDog = props => (
  <div className = 'quadrant'>
    <img src={props.currentDog} style={imageStyle}/>
    <button onClick={props.nextWag}>next</button>
  </div>
)

export default ShowDog
