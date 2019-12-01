import React from 'react'

const profileStyle = {
  height: '268px',
  maxWidth: '478px',
  display: 'block',
  margin: 'auto'
}

const Profile = props => (
  <div className='quadrant'>
    <img style={profileStyle} src={props.profile} />
  </div>
)

export default Profile
