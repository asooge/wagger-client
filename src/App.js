import React from 'react'
import { Route, Link } from 'react-router-dom'
import Welcome from './Welcome'

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
    </div>
  </div>
)

export default App
