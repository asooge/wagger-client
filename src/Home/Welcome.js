import React from 'react'

const Welcome = (props) => {
  // const heyThere = (<p>Hey, {props.user.name}</p>)
  if (props.user) {
    return (
      <div className='quadrant' style={{ padding: '1rem' }}>
        <h1>Welcome to Wagger</h1>
        <p>Meet other dogs in your area</p>
        <p>Sign in or sign up to start wagging</p>
        {(props.user) ? (<p>Hey there, {props.user.name}</p>) : ''}
      </div>
    )
  } else {
    return (
      <div className='quadrant' style={{ padding: '1rem' }}>
        <h1>Welcome to Wagger</h1>
        <p>Meet other dogs in your area</p>
        <p>Sign in or sign up to start wagging</p>
        <p>Give it a try with <strong>test@email.com</strong> and password: <strong>test</strong> </p>
      </div>
    )
  }
}

export default Welcome
