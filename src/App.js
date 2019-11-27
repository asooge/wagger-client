import React from 'react'
import { Route, Link } from 'react-router-dom'
import Welcome from './Welcome'
import Randog from './Randog'
import SignIn from './SignIn'
import AuthForm from './AuthForm'

const Dashboard = () => (
  <div>
    <h3>Dashboard</h3>
    <p>This is separate route.</p>
  </div>
)

const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>

    <div>
      <Route path="/dashboard" component={Dashboard}/>
    </div>
    <div className='full-view'>
      <Welcome />
      <Randog />
      <SignIn />
      <AuthForm />
    </div>
  </div>
)

export default App
