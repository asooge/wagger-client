import React from 'react'
import Welcome from './Home/Welcome'
import Randog from './Home/Randog'
import Auth from './Home/Auth'

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
        showMessage={props.showMessage}
        signOut={props.signOut}
      />
    </div>
  )
}

export default Home
