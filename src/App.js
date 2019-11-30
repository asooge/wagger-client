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
      signIn: null,
      randogs: [],
      currentDog: null
    }
  }
  componentDidMount () {
    axios('https://api.giphy.com/v1/gifs/search?q=dogs&api_key=UW6UfEEO71CGk2AZgexrHeGYiTRAy1GK&rating=g&limit=1000')
      .then((res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        const filterDogs = res.data.data.filter(dog => dog.images.original.width / dog.images.original.height >= 1.05)
        const dogIds = filterDogs.map(dog => dog.id)
        console.log(dogIds)
        const dogUrls = dogIds.map(id => `https://i.giphy.com/media/${id}/giphy.webp`)
        console.log(dogUrls)
        const randNum = Math.floor(Math.random() * dogUrls.length)
        this.setState({ currentDog: dogUrls[randNum] })
        this.setState({ randogs: dogUrls })
        // const shuffleDog = setInterval(() => this.updateDog(), 12000)
      })
      .catch(console.error)
  }

  updateDog = () => {
    console.log('update successful')
    const randNum = Math.floor(Math.random() * this.state.randogs.length)
    console.log(randNum)
    this.setState({ currentDog: this.state.randogs[randNum] })
  }
  updateSignIn = (event) => {
    this.setState({ signIn: event.target.name })
  }
  shuffleDog = setInterval(() => this.updateDog(), 12000)

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
    } else if (data.speak) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/speak`, data)
        .then(res => {
          this.setState({ user: res.data.user })
        })
    } else if (this.state.user && this.state.user.images.length === 4) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/profile`, data)
        .then(res => {
          clearInterval(this.shuffleDog)
          this.setState({ user: res.data.user })
          this.setState({ currentDog: res.data.user.profile })
        })
    } else if (this.state.user) {
      console.log('image submit')
      axios({
        method: 'POST',
        url: `${apiConfig}/users/${this.state.user._id}/images/${this.state.user.images.length}`,
        data
      })
        .then(res => {
          console.log(res)
          clearInterval(this.shuffleDog)
          this.setState({ user: res.data.user })
          this.setState({ currentDog: res.data.user.images[res.data.user.images.length - 1] })
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
          <Randog currentDog={this.state.currentDog}/>
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
