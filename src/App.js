import React from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import Wagger from './Wagger'
import Home from './Home'
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
      currentDog: 'null',
      needBones: false
    }
  }
  componentDidMount () {
    axios('https://api.giphy.com/v1/gifs/search?q=dogs&api_key=UW6UfEEO71CGk2AZgexrHeGYiTRAy1GK&rating=g&limit=1000')
      .then((res) => {
        const filterDogs = res.data.data.filter(dog => dog.images.original.width / dog.images.original.height >= 1.05)
        const dogIds = filterDogs.map(dog => dog.id)
        const dogUrls = dogIds.map(id => `https://i.giphy.com/media/${id}/giphy.webp`)
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
  shuffleDog = () => setInterval(() => this.updateDog(), 12000)

  makeAxios = (data) => {
    console.log(data)
    // create name for dog
    if (data.name) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/name`, data)
        .then(res => this.setState({ user: res.data.user }))
        .catch(console.error)
    } else if (data.speak) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/speak`, data)
        .then(res => this.setState({ user: res.data.user }))
    } else if (this.state.user && this.state.user.images.length === 4) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/profile`, data)
        .then(res => {
          clearInterval(this.shuffleDog)
          this.setState({ user: res.data.user, currentDog: res.data.user.profile })
        })
    } else if (this.state.user) {
      console.log('image submit')
      axios.post(`${apiConfig}/users/${this.state.user._id}/images/${this.state.user.images.length}`, data)
        .then(res => {
          clearInterval(this.shuffleDog)
          this.setState({ user: res.data.user, currentDog: res.data.user.images[res.data.user.images.length - 1] })
        })
        .catch(console.error)
    } else if (this.state.signIn === 'sign-in') {
      axios.post(`${apiConfig}/sign-in`, data)
        .then(res => {
          if (res.data.user.wag > 4) {
            this.setState({ user: res.data.user, needBones: true })
          } else {
            this.setState({ user: res.data.user })
          }
        })
        .catch(console.error)
    } else if (this.state.signIn === 'sign-up') {
      axios.post(`${apiConfig}/sign-up`, data)
        .then(res => {
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
          <Route exact path="/" render={() => {
            return (<Home
              user={this.state.user}
              currentDog={this.state.currentDog}
              signIn={this.state.signIn}
              auth={this.state.auth}
              makeAxios={this.makeAxios}
              updateSignIn={this.updateSignIn}
            />)
          }
          } />
          <Route path="/wagger" render={() => {
            if (!this.state.user) {
              return <Redirect to='/' />
            }
            return (
              <Wagger
                currentDog={this.state.currentDog}
                profile={this.state.user.profile}
                speak={this.state.user.speak}
                matches={this.state.user.matches.length}
                userName={this.state.user.name}
                setUser={this.setState.bind(this)}
                me={this.state.user._id}
                shuffleDog={this.shuffleDog}
                waggers={this.state.user.waggers}
                wag={this.state.user.wag}
                needBones={this.state.needBones}
              />
            )
          }} />
        </div>

      </div>
    )
  }
}

export default App
