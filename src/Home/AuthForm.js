import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router-dom'
const FormData = require('form-data')

const authContainer = {
  display: 'flex',
  alignItem: 'center'
}

const formStyle = {
  display: 'block',
  margin: 'auto'
}

const AuthForm = (props) => {
  // initialize state for email, password, confirm_password
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [speak, setSpeak] = useState('')
  const [profile, setProfile] = useState('')

  const handleInput = (event) => {
    event.persist()
    const htmlName = event.target.name
    const value = event.target.value
    if (htmlName === 'email') {
      setEmail(value)
    } else if (htmlName === 'password') {
      setPassword(value)
    } else if (htmlName === 'confirm-password') {
      setConfirmPassword(value)
    } else if (htmlName === 'name') {
      setName(value)
    } else if (htmlName === 'file') {
      setImage(value)
    } else if (htmlName === 'speak') {
      setSpeak(value)
    } else if (event.target.id === 'profile') {
      setProfile(value)
    }
  }
  const sendData = (event) => {
    event.preventDefault()
    // define data based on form name
    let data = ''
    if (name) {
      data = { name: name }
    } else if (password) {
      data = {
        credentials: {
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    } else if (event.target.name === 'file') {
      data = new FormData(event.target)
    } else if (event.target.name === 'speak') {
      data = { speak: speak }
    } else if (event.target.name === 'profile') {
      data = new FormData(event.target)
    }
    // make axios call
    console.log(data)
    props.makeAxios(data)
    // reset state to initial values (and clear forms)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setImage('')
    setSpeak('')
  }
  const confirmPass = (
    <Fragment>
      <label htmlFor='confirm-password'>Confirm: </label>
      <input type='password' onInput={handleInput} name='confirm-password' value={confirmPassword} placeholder='confirm password' />
      <br />
    </Fragment>
  )
  if (!props.signIn) {
    return ''
  }
  // if user is signed in, but has no dog name
  if (props.user && !props.user.name) {
    return (
      <div style={authContainer}className='quadrant'>
        <form name='name' onSubmit={sendData}>
          <label htmlFor='name'>What is your dog name?</label>
          <br />
          <input onInput={handleInput} name='name' value={name} placeholder='enter your dog name' />
          <button>Submit</button>
        </form>
      </div>
    )
  }
  // if user is signed in, but has no dog images
  if (props.user && props.user.images.length < 4) {
    return (
      <div style={authContainer}className='quadrant'>
        <form name='file' onSubmit={sendData}>
          <p>Upload pictures of your dog. No selfies!</p>
          <label htmlFor='images'>Image {props.user.images.length + 1}/4</label>
          <br />
          <input type='file' encType='multipart/form-data' onInput={handleInput} name='file' value={image} placeholder='dog pictures' />
          <button>Submit</button>
        </form>
      </div>
    )
  }
  // if user is signed in but has not updated 'speak'
  if (props.user && props.user.speak === 'woof') {
    return (
      <div style={authContainer}className='quadrant'>
        <form name='speak' onSubmit={sendData}>
          <p>Say something about your dog. Limit 300 characters.</p>
          <label htmlFor='speak'>Speak: </label>
          <br />
          <textarea rows="5" cols="50" onInput={handleInput} maxLength='300' name='speak' value={speak} placeholder='woof' />
          <button>Submit</button>
        </form>
      </div>
    )
  }
  // if user is signe in but doesn't have a profile picture
  if (props.user && !props.user.profile) {
    return (
      <div style={authContainer}className='quadrant'>
        <form name='file' id='profile' onSubmit={sendData}>
          <p>Upload a profile picture, of you and your dog. This will only be visible to your matches.</p>
          <label htmlFor='images'>Your profile: </label>
          <input type='file' encType='multipart/form-data' onInput={handleInput} name='profile' id='profile' value={profile} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
  if (props.user && props.user.profile) {
    return <Redirect to='/wagger' />
  }
  return (
    <div style={authContainer}className='quadrant'>
      <form style={formStyle} name='user' onSubmit={sendData}>
        <label htmlFor='email'>Email: </label>
        <input onInput={handleInput} name='email' value={email} placeholder='enter email' />
        <br />
        <label htmlFor='password'>Password: </label>
        <input type='password' onInput={handleInput} name='password' value={password} placeholder='enter password' />
        <br />
        { props.signIn === 'sign-up' ? confirmPass : ''}
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AuthForm
