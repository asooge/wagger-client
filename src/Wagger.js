import React from 'react'
// import { Redirect } from 'react-router-dom'
import Profile from './Profile'
import ShowDog from './ShowDog'
import UserDetail from './UserDetail'
import DogDetails from './DogDetails'
import apiConfig from './apiConfig'
import axios from 'axios'

class Wagger extends React.Component {
  constructor (props) {
    super()
    this.state = {
      waggers: props.waggers,
      wag: props.wag,
      imageIndex: 0,
      needBones: false
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
    if (!this.props.waggers[0]) {
      return (
        <div style={{ flexDirection: 'column' }}className='full-view'>
          <div className='quadrant'>
            <Profile profile={this.props.profile} />
          </div>
          <div className='quadrant'>
            <UserDetail profile={this.props.profile} userName={this.props.userName} speak={this.props.speak}/>
          </div>
          <div className='quadrant'>
            <ShowDog />
          </div>
          <div className='quadrant'>
            <DogDetails />
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
          <ShowDog nextDog={this.nextDog} nextImage={this.nextImage} priorImage={this.priorImage} needBones={this.state.needBones} currentDog={this.props.currentDog} seeWagger={this.props.waggers[this.props.wag].images[this.state.imageIndex]}/>
        </div>
        <div className='quadrant'>
          <DogDetails speak={this.props.waggers[this.props.wag].speak} userName={this.props.waggers[this.props.wag].name} needBones={this.state.needBones} nextDog={this.nextDog}/>
        </div>
      </div>
    )
  }
}

export default Wagger
