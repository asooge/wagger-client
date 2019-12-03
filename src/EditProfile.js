import React, { Fragment } from 'react'

const buttonStyle = {
  display: 'block',
  margin: '5px',
  borderRadius: '3px'
}

const EditProfile = props => (
  <Fragment>
    <button style={buttonStyle}>change name</button>
    <button style={buttonStyle}>change password</button>
    <button style={buttonStyle}>update image</button>
    <button style={buttonStyle}>update speak</button>
    <button style={buttonStyle}>see all matches</button>
  </Fragment>
)

export default EditProfile
