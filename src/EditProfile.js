import React, { Fragment } from 'react'
import AllMatches from './AllMatches'

const buttonStyle = {
  display: 'block',
  margin: '5px',
  borderRadius: '3px'
}

const EditProfile = props => (
  <Fragment>
    <AllMatches
      matches={props.matches}
    />
    <button style={buttonStyle}>see all matches</button>
    <button id='name' onClick={props.setShow} style={buttonStyle}>change name</button>
    <button id='password' onClick={props.setShow} style={buttonStyle}>change password</button>
    <button id='image' onClick={props.setShow} style={buttonStyle}>update image</button>
    <button id='speak' onClick={props.setShow} style={buttonStyle}>update speak</button>
    <button id='sign-out' onClick={props.setShow} style={buttonStyle}>sign out</button>
  </Fragment>
)

export default EditProfile
