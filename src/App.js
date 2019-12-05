import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Wagger from './Wagger'
import Home from './Home'
import Match from './Match'
import FullProfile from './FullProfile'
import apiConfig from './apiConfig'
import axios from 'axios'

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
      currentDog: null,
      needBones: false,
      signInFail: false,
      signUpFail: false,
      requestFail: false,
      signOutFail: false,
      imageFail: false,
      passwordSuccess: false,
      signOutSuccess: false,
      instantMatch: true
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
        this.shuffleDog()
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

  signOut = () => {
    axios({
      method: 'delete',
      url: `${apiConfig}/sign-out`,
      headers: {
        Authorization: `Bearer ${this.state.user.token}`
      }
    })
      .then(() => {
        this.setState({ user: null })
        this.showMessage('sign-out-success')
      })
  }

  makeAxios = (data) => {
    console.log(data)
    // create name for dog
    if (data.name) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/name`, data)
        .then(res => this.setState({ user: res.data.user }))
        .catch(() => this.showMessage('request'))
    } else if (data.speak) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/speak`, data)
        .then(res => this.setState({ user: res.data.user }))
        .catch(() => this.showMessage('request'))
    } else if (this.state.user && this.state.user.images.length === 4) {
      axios.post(`${apiConfig}/users/${this.state.user._id}/profile`, data)
        .then(res => {
          clearInterval(this.shuffleDog)
          this.setState({ user: res.data.user, currentDog: res.data.user.profile })
        })
        .catch(() => this.showMessage('image'))
    } else if (this.state.user) {
      console.log('image submit')
      axios.post(`${apiConfig}/users/${this.state.user._id}/images/${this.state.user.images.length}`, data)
        .then(res => {
          clearInterval(this.shuffleDog)
          this.setState({ user: res.data.user, currentDog: res.data.user.images[res.data.user.images.length - 1] })
        })
        .catch(() => this.showMessage('image'))
    } else if (this.state.signIn === 'sign-in') {
      axios.post(`${apiConfig}/sign-in`, data)
        .then(res => {
          if (res.data.user.wag > 4) {
            this.setState({ user: res.data.user, needBones: true })
          } else {
            this.setState({ user: res.data.user })
          }
        })
        .catch(() => {
          this.showMessage('sign-in')
        })
    } else if (this.state.signIn === 'sign-up') {
      axios.post(`${apiConfig}/sign-up`, data)
        .then(res => {
          this.setState({ signIn: 'sign-in' })
          this.makeAxios(data)
        })
        .catch(() => {
          this.showMessage('sign-up')
        })
    }
  }
  footerJsx = (<h1>You found Wagger</h1>)
  showMessage = (message) => {
    if (message === 'sign-in') {
      this.setState({ signInFail: true })
      setTimeout(() => this.setState({ signInFail: false }), 3000)
    }
    if (message === 'sign-up') {
      this.setState({ signUpFail: true })
      setTimeout(() => this.setState({ signUpFail: false }), 3000)
    }
    if (message === 'sign-out') {
      this.setState({ signOutFail: true })
      setTimeout(() => this.setState({ signOutFail: false }), 3000)
    }
    if (message === 'request') {
      this.setState({ requestFail: true })
      setTimeout(() => this.setState({ requestFail: false }), 3000)
    }
    if (message === 'image') {
      this.setState({ imageFail: true })
      setTimeout(() => this.setState({ imageFail: false }), 3000)
    }
    if (message === 'password-success') {
      this.setState({ passwordSuccess: true })
      setTimeout(() => this.setState({ passwordSuccess: false }), 3000)
    }
    if (message === 'sign-out-success') {
      console.log('sign out success')
      this.setState({ signOutSuccess: true })
      setTimeout(() => this.setState({ signOutSuccess: false }), 3000)
    }
  }
  render () {
    if (this.state.signInFail) {
      this.footerJsx = (<h1 className='fail'>Sign in failed</h1>)
    } else if (this.state.signUpFail) {
      this.footerJsx = (<h1 className='fail'>Sign up failed</h1>)
    } else if (this.state.requestFail) {
      this.footerJsx = (<h1 className='fail'>Request failed</h1>)
    } else if (this.state.passwordSuccess) {
      this.footerJsx = (<h1 className='success'>Password updated</h1>)
    } else if (this.state.signOutSuccess) {
      this.footerJsx = (<h1 className='fail'>Signed out</h1>)
    } else {
      this.footerJsx = (<h1>You found Wagger</h1>)
    }
    return (
      <div>
        <div className='header'>
          <h1>Wagger</h1>
        </div>

        <div>
          <Route exact path="/" render={() => {
            return (<Home
              user={this.state.user}
              currentDog={this.state.currentDog}
              signIn={this.state.signIn}
              auth={this.state.auth}
              makeAxios={this.makeAxios}
              updateSignIn={this.updateSignIn}
              showMessage={this.showMessage}
              signOut={this.signOut}
            />)
          }
          } />
          <Route exact path="/wagger" render={() => {
            if (!this.state.user) {
              return <Redirect to='/' />
            }
            return (
              <Wagger
                currentDog={this.state.currentDog}
                profile={this.state.user.profile}
                speak={this.state.user.speak}
                matches={this.state.user.matches}
                userName={this.state.user.name}
                setUser={this.setState.bind(this)}
                me={this.state.user._id}
                shuffleDog={this.shuffleDog}
                waggers={this.state.user.waggers}
                wag={this.state.user.wag}
                needBones={this.state.needBones}
                instantMatch={this.state.instantMatch}
                time={this.state.user.lastPull}
              />
            )
          }} />
          <Route path="/profile" render={() => {
            if (!this.state.user) {
              return <Redirect to='/' />
            }
            return (
              <FullProfile
                name={this.state.user.name}
                speak={this.state.user.speak}
                user={this.state.user._id}
                setUser={this.setState.bind(this)}
                profile={this.state.user.profile}
                images={[this.state.user.profile].concat(this.state.user.images)}
                token={this.state.user.token}
                matches={this.state.user.matches}
                showMessage={this.showMessage}
                signOut={this.signOut}
              />
            )
          }} />
          <Route path="/match/:id" render={() => {
            if (!this.state.user) {
              return <Redirect to='/' />
            }
            return (
              <Match
                matches={this.state.user.matches}
                me={this.state.user._id}
                setUser={this.setState.bind(this)}
              />
            )
          }} />
        </div>
        <div className='footer'>
          {this.footerJsx}
        </div>
      </div>
    )
  }
}

export default App
