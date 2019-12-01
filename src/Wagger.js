import React from 'react'
// import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import ShowDog from './ShowDog'
import UserDetail from './UserDetail'

class Wagger extends React.Component {
  constructor () {
    super()
    this.state = {
      waggers: [],
      wag: 0,
      needBones: false
    }
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
      return (
        this.setState({ needBones: true })
      )
    }
  }

  render () {
    return (
      <div className='full-view'>
        <div className='quadrant'>
          <Profile profile={this.props.profile} />
        </div>
        <div className='quadrant'>
          <ShowDog nextDog={this.nextDog} needBones={this.state.needBones} currentDog={this.props.currentDog}/>
        </div>
        <div className='quadrant'>
          <UserDetail profile={this.props.profile} userName={this.props.userName} speak={this.props.speak}/>
        </div>
      </div>
    )
  }
}

export default Wagger
