import React from 'react'
import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import ShowDog from './ShowDog'
import UserDetail from './UserDetail'
import DogDetails from './DogDetails'
// import Match from './Match'
import apiConfig from './apiConfig'
import axios from 'axios'

class Wagger extends React.Component {
  constructor (props) {
    super()
    this.state = {
      waggers: props.waggers,
      wag: props.wag,
      imageIndex: 0,
      instantMatch: false,
      ref: ''
    }
  }

  componentDidMount () {
    axios({
      method: 'get',
      url: `${apiConfig}/wagger/${this.props.me}`,
      headers: {
        Authorization: `Bearer ${this.props.token}`
      }
    })
    // axios(`${apiConfig}/wagger/${this.props.me}`)
      .then(res => {
        this.props.setUser({ user: res.data.user })
      })
      .catch(console.error)
  }

  nextDog = (event) => {
    // if event.target.name === 'no'
    if (event.target.name === 'no') {
      // sent the api post request to '/wagger/:id'
      axios({
        method: 'post',
        url: `${apiConfig}/wagger/${this.props.me}`,
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      // axios.post(`${apiConfig}/wagger/${this.props.me}`)
        .then(res => this.props.setUser({ user: res.data.user }))
        .catch(console.error)
    } else if (event.target.name === 'yes') {
      // send post request '/wagger/:id'
      axios({
        method: 'patch',
        url: `${apiConfig}/users/${this.props.me}/likes/${this.props.waggers[this.props.wag]._id}`,
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
        .then(res => {
          // if response user matches is greater than current user matches
          if (res.data.user.matches.length > this.props.matches.length) {
            // update user data
            axios({
              method: 'get',
              url: `${apiConfig}/users/${this.props.me}`,
              headers: {
                Authorization: `Bearer ${this.props.token}`
              }
            })
              .then(this.props.setUser({ user: res.data.user }))
            // return JSX. Redirect to the match component
          } else {
            this.props.setUser({ user: res.data.user })
          }
        })
    }
    this.props.setUser({ instantMatch: true })

    // if wag index is less than 4. Console log
    if (this.props.wag < 4) {
      // console.log('wag')

      // otherwise return JSX
      // wagger array is only length: 5
    } else {
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
    if (this.props.wag > 0 && this.props.wag <= 5 && this.props.instantMatch && this.props.matches.find(match => match.reference._id === this.props.waggers[this.props.wag - 1]._id)) {
      return (
        <Redirect to={`/match/${this.props.matches[this.props.matches.length - 1].reference._id}`} />
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
              time={this.props.time}
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
          <DogDetails speak={this.props.waggers[this.props.wag].speak} userName={this.props.waggers[this.props.wag].name} needBones={this.props.needBones} nextDog={this.nextDog} time={this.props.time}/>
        </div>
      </div>
    )
  }
}

export default Wagger
