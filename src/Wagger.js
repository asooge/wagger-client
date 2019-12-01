import React from 'react'
// import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import ShowDog from './ShowDog'

class Wagger extends React.Component {
  constructor () {
    super()
    this.state = {
      waggers: [],
      wag: 0,
      needBones: false
    }
  }

  nextWag = () => {
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
    if (this.state.needBones) {
      return (
        <p>show need bones menu and randog</p>
      )
    }
    return (
      <div className='full-view'>
        <div className='quadrant'>
          <Profile profile={this.props.user} />
        </div>
        <div className='quadrant'>
          <ShowDog nextDog={this.nextWag} currentDog={this.props.currentDog}/>
        </div>
      </div>
    )
  }
}

export default Wagger
