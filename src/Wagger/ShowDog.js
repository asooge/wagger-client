import React from 'react'

const imageStyle = {
  height: '268px',
  maxWidth: '478px',
  display: 'block',
  margin: 'auto'
}

const ShowDog = props => {
  if (props.needBones) {
    return (
      <div className = 'quadrant'>
        <img src={props.currentDog} style={imageStyle}/>
      </div>
    )
  } else {
    return (
      <div className = 'quadrant'>
        <img src={props.seeWagger} style={imageStyle} />
        <div className='next-image' onClick={props.priorImage} />
        <div className='next-image' onClick={props.nextImage} />
      </div>
    )
  }
}

export default ShowDog
