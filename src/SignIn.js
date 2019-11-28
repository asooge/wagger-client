import React from 'react'

const styles = {
  signIn: {
    display: 'block',
    color: 'blue',
    width: '80%',
    height: '26%',
    padding: '0',
    margin: '13% auto 1%',
    borderRadius: '5px'
  },
  signUp: {
    display: 'block',
    color: 'red',
    width: '80%',
    height: '26%',
    padding: '0',
    margin: '1% auto 13%',
    borderRadius: '5px'
  }
}

const SignIn = (props) => {
  return (
    <div style={{ margin: 'auto' }} className='quadrant'>
      <button name='sign-in' onClick={props.updateSignIn} style={styles.signIn}>Sign In</button>
      <button name='sign-up' onClick={props.updateSignIn} style={styles.signUp} >Sign Up</button>
    </div>
  )
}

export default SignIn
