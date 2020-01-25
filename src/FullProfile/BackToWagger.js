import React, { Fragment } from 'react'

const buttonStyle = {
  display: 'block',
  color: 'red',
  width: '80%',
  height: '26%',
  padding: '0',
  margin: '13% auto 1%',
  borderRadius: '5px',
  position: 'relative'
}

const BackToWagger = props => {
  return (
    <Fragment>
      <h1 style={{ display: 'inline-block' }}>{props.name}</h1>
      <h3 style={
        {
          display: 'inline-block',
          float: 'right',
          padding: '5px'
        }
      }>{props.number}/4</h3>
      <p>{props.speak}</p>
      <button style={buttonStyle} onClick={() => props.setState({ backToWagger: true })}>Back to Wagger</button>
    </Fragment>
  )
}

export default BackToWagger
