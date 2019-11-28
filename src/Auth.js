import React, { Fragment } from 'react'

import SignIn from './SignIn'
import AuthForm from './AuthForm'

const Auth = (props) => {
  return (
    <Fragment>
      <SignIn
        updateSignIn={props.updateSignIn}
      />
      <AuthForm
        signIn={props.signIn}
        auth={props.auth}
        user={props.user}
        makeAxios={props.makeAxios}
      />
    </Fragment>
  )
}

export default Auth
