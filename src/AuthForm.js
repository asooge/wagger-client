import React from 'react'

const AuthForm = () => {
  return (
    <div className='quadrant'>
      <form>
        <input name='email' placeholder='enter email' />
        <input name='password' placeholder='enter password' />
        <input name='confirm-password' placeholder='confirm password' />
      </form>
    </div>
  )
}

export default AuthForm
