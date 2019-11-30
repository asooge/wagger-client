import React, { Fragment, useState } from 'react'
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
    }
  }
  const sendData = (event) => {
    event.preventDefault()
    console.log(name)
    // define data based on form name
    let data = ''
    if (name) {
      data = { name: name }
      console.log(data)
    } else if (password) {
      data = {
        credentials: {
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    } else if (event.target.name === 'file') {
      console.log(event.target.name)
      console.log('ready to send data')
      console.log(event.target)
      console.log(document.getElementById('image-form'))
      data = new FormData(event.target)
      console.log(data)
    } else if (event.target.name === 'speak') {
      data = { speak: speak }
    }
    // make axios call
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
      <input onInput={handleInput} name='confirm-password' value={confirmPassword} placeholder='confirm password' />
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
  return (
    <div style={authContainer}className='quadrant'>
      <form style={formStyle} name='user' onSubmit={sendData}>
        <label htmlFor='email'>Email: </label>
        <input onInput={handleInput} name='email' value={email}placeholder='enter email' />
        <br />
        <label htmlFor='password'>Password: </label>
        <input onInput={handleInput} name='password' value={password} placeholder='enter password' />
        <br />
        { props.signIn === 'sign-up' ? confirmPass : ''}
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AuthForm
