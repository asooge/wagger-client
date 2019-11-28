import React, { Fragment, useState } from 'react'

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

  const handleInput = (event) => {
    event.persist()
    const name = event.target.name
    const value = event.target.value
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'confirm-password') {
      setConfirmPassword(value)
    } else if (name === 'name') {
      setName(value)
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
    } else {
      data = {
        credentials: {
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }
      }
    }
    // make axios call
    props.makeAxios(data)
    // reset state to initial values (and clear forms)
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
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
  if (props.user && !props.user.name) {
    return (
      <div className='quadrant'>
        <form name='name' onSubmit={sendData}>
          <label htmlFor='name'>What is your dog name?</label>
          <br />
          <input onInput={handleInput} name='name' value={name} placeholder='enter your dog name' />
          <button>Submit</button>
        </form>
      </div>
    )
  }
  return (
    <div className='quadrant'>
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
