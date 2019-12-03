import React from 'react'
import { Redirect } from 'react-router-dom'

const buttonStyle = {
  display: 'block',
  color: 'red',
  width: '80%',
  height: '26%',
  padding: '0',
  margin: '13% auto 1%',
  borderRadius: '5px',
  position: 'relative',
  top: '75px'
}

class FullProfile extends React.Component {
  constructor (props) {
    super()
    this.state = {
      backToWagger: false,
      name: ''
    }
  }
  render () {
    if (this.state.backToWagger === true) {
      return <Redirect to='/wagger' />
    }
    return (
      <div className='full-view'>
        <div className='quadrant'>
          <h1>Full Profile</h1>
        </div>
        <div className='quadrant'>
          <p>Q2</p>
        </div>
        <div className='quadrant'>
          <p>Q3</p>
        </div>
        <div className='quadrant'>
          <p>Q4</p>
          <button style={buttonStyle} onClick={() => this.setState({ backToWagger: true })}>Back to Wagger</button>
        </div>
      </div>
    )
  }
}

export default FullProfile
