import React from 'react'

const profileStyle = {
  display: 'flex',
  alignItem: 'center'
}

const Profile = props => (
  <div style={profileStyle} className='quadrant'>
    <img src={props.profile} />
  </div>
)

export default Profile
