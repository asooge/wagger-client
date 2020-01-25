import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const buttonStyle = {
  display: 'block',
  color: 'green',
  width: '80%',
  height: '26%',
  padding: '0',
  margin: '13% auto 1%',
  borderRadius: '5px'
}

const UserDetail = props => {
  const [fullProfile, setFullProfile] = useState(false)

  if (fullProfile === true) {
    return <Redirect to='/profile' />
  }
  return (
    <div className='quadrant padding'>
      <h1>{props.userName}</h1>
      <p>{props.speak}</p>
      <button style={buttonStyle} onClick={() => setFullProfile(true)}>Full Profile</button>
    </div>
  )
}

export default UserDetail
