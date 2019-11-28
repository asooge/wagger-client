import React from 'react'
import { Route, Link } from 'react-router-dom'
import Welcome from './Welcome'
import Randog from './Randog'
import Auth from './Auth'
import apiConfig from './apiConfig'
import axios from 'axios'

const Dashboard = () => (
  <div>
    <h3>Dashboard</h3>
    <p>This is separate route.</p>
  </div>
)

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      user: null,
      auth: {
        credentials: {
          email: '',
          password: '',
          passwordConfirmation: ''
        }
      },
      signIn: null
    }
  }
  updateSignIn = (event) => {
    this.setState({ signIn: event.target.name })
  }

  makeAxios = (data) => {
    console.log(data)
    // create name for dog
    if (data.name) {
      axios({
        method: 'POST',
        url: `${apiConfig}/users/${this.state.user._id}/name`,
        data
      })
        .then(res => {
          console.log(res)
          this.setState({ user: res.data.user })
        })
        .catch(console.error)
    } else if (this.state.signIn === 'sign-in') {
      axios({
        method: 'POST',
        url: apiConfig + '/sign-in',
        data
      })
        .then(res => {
          console.log(res)
          this.setState({ user: res.data.user })
        })
        .catch(console.erro)
    } else if (this.state.signIn === 'sign-up') {
      axios({
        method: 'POST',
        url: apiConfig + '/sign-up',
        data
      })
        .then(res => {
          console.log(res)
          this.setState({ signIn: 'sign-in' })
          this.makeAxios(data)
        })
        .catch(console.error)
    }
  }
  render () {
    return (
      <div>
        <nav>
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <div>
          <Route path="/dashboard" component={Dashboard}/>
        </div>
        <div className='full-view'>
          <Welcome user={this.state.user}/>
          <Randog />
          <Auth
            signIn={this.state.signIn}
            auth={this.state.auth}
            user={this.state.user}
            makeAxios={this.makeAxios}
            updateSignIn={this.updateSignIn}
          />
        </div>
      </div>
    )
  }
}

export default App
