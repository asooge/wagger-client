import React from 'react'

const imageStyle = {
  height: '268px',
  maxWidth: '478px',
  display: 'block',
  margin: 'auto'
}

const MyImages = props => (
  <div className='quadrant'>
    <img style={imageStyle} src={props.image} />
    <div id='minus' className='next-image' onClick={props.browseImage} />
    <div id='plus' className='next-image' onClick={props.browseImage} />
  </div>
)

export default MyImages
