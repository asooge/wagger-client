import React from 'react'

const buttonStyle = {
  display: 'block',
  color: 'green',
  width: '80%',
  height: '26%',
  padding: '0',
  margin: '13% auto 1%',
  borderRadius: '5px'
}

const UserDetail = props => (
  <div className='quadrant'>
    <h1>{props.userName}</h1>
    <p>{props.speak}</p>
    <button style={buttonStyle}>Full Profile</button>
  </div>
)

export default UserDetail
