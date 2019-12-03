import React from 'react'

const imageStyle = {
  height: '268px',
  maxWidth: '478px',
  display: 'block',
  margin: 'auto'
}

// const nextStyle = {
//   height: '268px',
//   width: '237px',
//   opacity: '0%',
//   backgroundColor: 'blue',
//   display: 'inline-block',
//   border: 'solid black 2px',
//   position: 'relative',
//   bottom: '268px',
//   zIndex: '10'
// }

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
        <div className='next-image' onClick={props.priorImage} />
        <div className='next-image' onClick={props.nextImage} />
      </div>
    )
  }
}

export default ShowDog
