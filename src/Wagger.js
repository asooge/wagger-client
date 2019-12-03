import React from 'react'
// import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import ShowDog from './ShowDog'
import UserDetail from './UserDetail'
import DogDetails from './DogDetails'
import Match from './Match'
import apiConfig from './apiConfig'
import axios from 'axios'

class Wagger extends React.Component {
  constructor (props) {
    super()
    this.state = {
      waggers: props.waggers,
      wag: props.wag,
      imageIndex: 0
    }
  }

  componentDidMount () {
    axios(`${apiConfig}/wagger/${this.props.me}`)
      .then(res => {
        console.log('see waggers:', res)
        this.props.setUser({ user: res.data.user })
        console.log('wheres the new dog')
      })
      .catch(console.error)
  }

  nextDog = (event) => {
    // if event.target.name === 'no'
    if (event.target.name === 'no') {
      // sent the api post request to '/wagger/:id'
      axios.post(`${apiConfig}/wagger/${this.props.me}`)
        .then(res => this.props.setUser({ user: res.data.user }))
        .catch(console.error)
    } else if (event.target.name === 'yes') {
      // send post request '/wagger/:id'
      axios.patch(`${apiConfig}/users/${this.props.me}/likes/${this.props.waggers[this.props.wag]._id}`)
        .then(res => {
          // if response user matches is greater than current user matches
          if (res.data.user.matches.length > this.props.matches.length) {
            console.log('its a match')
            // update user data
            this.props.setUser({ user: res.data.user })
            // return JSX. Redirect to the match component
          } else {
            this.props.setUser({ user: res.data.user })
          }
        })
    }

    // if wag index is less than 4. Console log
    if (this.props.wag < 4) {
      console.log('wag')

      // otherwise return JSX
      // wagger array is only length: 5
    } else {
      console.log('got bones...?')
      this.props.shuffleDog()
      this.props.setUser({ needBones: true })
    }
  }

  nextImage = () => {
    if (this.state.imageIndex < this.props.waggers[this.props.wag].images.length - 1) {
      this.setState((state) => (
        { imageIndex: state.imageIndex + 1 }
      ))
    }
  }

  priorImage = () => {
    if (this.state.imageIndex > 0) {
      this.setState((state) => (
        { imageIndex: state.imageIndex - 1 }
      ))
    }
  }

  render () {
    if (this.props.wag > 0 && this.props.matches.find(match => match.reference === this.props.waggers[this.props.wag - 1]._id)) {
      return (
        <Match user={this.props.matches[this.props.matches.length - 1].reference}/>
      )
    }
    if (!this.props.waggers[this.props.wag]) {
      return (
        <div style={{ flexDirection: 'column' }}className='full-view'>
          <div className='quadrant'>
            <Profile profile={this.props.profile} />
          </div>
          <div className='quadrant'>
            <UserDetail profile={this.props.profile} userName={this.props.userName} speak={this.props.speak}/>
          </div>
          <div className='quadrant'>
            <ShowDog
              needBones={this.props.needBones} currentDog={this.props.currentDog}
            />
          </div>
          <div className='quadrant'>
            <DogDetails
              needBones={this.props.needBones}
            />
          </div>
        </div>
      )
    }
    return (
      <div style={{ flexDirection: 'column' }}className='full-view'>
        <div className='quadrant'>
          <Profile profile={this.props.profile} />
        </div>
        <div className='quadrant'>
          <UserDetail profile={this.props.profile} userName={this.props.userName} speak={this.props.speak}/>
        </div>
        <div className='quadrant'>
          <ShowDog nextDog={this.nextDog} nextImage={this.nextImage} priorImage={this.priorImage} needBones={this.props.needBones} currentDog={this.props.currentDog} seeWagger={this.props.waggers[this.props.wag].images[this.state.imageIndex]}/>
        </div>
        <div className='quadrant'>
          <DogDetails speak={this.props.waggers[this.props.wag].speak} userName={this.props.waggers[this.props.wag].name} needBones={this.props.needBones} nextDog={this.nextDog}/>
        </div>
      </div>
    )
  }
}

export default Wagger
