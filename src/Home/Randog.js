import React from 'react'
// import axios from 'axios'

const imageStyle = {
  height: '268px',
  maxWidth: '478px'
}

class Randog extends React.Component {
  render () {
    if (this.props.currentDog) {
      return (
        <div style={{ margin: 'auto' }} className='quandrant'>
          <img style={imageStyle} src={this.props.currentDog} />
        </div>
      )
    } else {
      return (
        <div className='quadrant'>
          <h1>Random Dog Gif</h1>
        </div>
      )
    }
  }
}

export default Randog
