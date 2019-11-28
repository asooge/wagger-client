import React from 'react'

const Welcome = (props) => {
  // const heyThere = (<p>Hey, {props.user.name}</p>)
  console.log(props)
  if (props.user) {
    return (
      <div className='quadrant'>
        <h1>Welcome to Wagger</h1>
        <p>Meet other dogs in your area</p>
        <p>Sign in or sign up to start wagging</p>
        {(props.user) ? (<p>Hey, there {props.user.name}</p>) : ''}
      </div>
    )
  } else {
    return (
      <div className='quadrant'>
        <h1>Welcome to Wagger</h1>
        <p>Meet other dogs in your area</p>
        <p>Sign in or sign up to start wagging</p>
      </div>
    )
  }
}

export default Welcome
