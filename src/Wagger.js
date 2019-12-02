import React from 'react'
// import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import ShowDog from './ShowDog'
import UserDetail from './UserDetail'
import DogDetails from './DogDetails'
import apiConfig from './apiConfig'
import axios from 'axios'

class Wagger extends React.Component {
  constructor () {
    super()
    this.state = {
      waggers: [],
      wag: 0,
      needBones: false
    }
  }

  componentDidMount () {
    axios(`${apiConfig}/wagger/${this.props.me}`)
      .then(res => {
        console.log('see waggers:', res)
        this.props.setUser({ user: res.data.user })
      })
      .catch(console.error)
  }

  nextDog = () => {
    // if wag index is less than 4. Set to next index ++

    if (this.state.wag < 4) {
      console.log('wag')
      this.setState((state) => (
        { wag: state.wag + 1 }
      ))
      // otherwise return JSX
      // wagger array is only length: 5
    } else {
      console.log('hello do I need to Redirect?')
      this.props.shuffleDog()
      return (
        this.setState({ needBones: true })
      )
    }
  }

  render () {
    return (
      <div style={{ flexDirection: 'column' }}className='full-view'>
        <div className='quadrant'>
          <Profile profile={this.props.profile} />
        </div>
        <div className='quadrant'>
          <UserDetail profile={this.props.profile} userName={this.props.userName} speak={this.props.speak}/>
        </div>
        <div className='quadrant'>
          <ShowDog nextDog={this.nextDog} needBones={this.state.needBones} currentDog={this.props.currentDog}/>
        </div>
        <div className='quadrant'>
          <DogDetails speak={this.props.speak} userName={this.props.userName} needBones={this.state.needBones} />
        </div>
      </div>
    )
  }
}

export default Wagger
