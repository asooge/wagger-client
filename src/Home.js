import React from 'react'
import Welcome from './Welcome'
import Randog from './Randog'
import Auth from './Auth'

const Home = props => {
  return (
    <div className='full-view'>
      <Welcome user={props.user}/>
      <Randog currentDog={props.currentDog}/>
      <Auth
        signIn={props.signIn}
        auth={props.auth}
        user={props.user}
        makeAxios={props.makeAxios}
        updateSignIn={props.updateSignIn}
      />
    </div>
  )
}

export default Home
