import React from 'react'
import { Redirect } from 'react-router-dom'
import EditProfile from './EditProfile'
import MyImages from './MyImages'
import BackToWagger from './BackToWagger'
import UpdateProfile from './UpdateProfile'

class FullProfile extends React.Component {
  constructor (props) {
    super()
    this.state = {
      backToWagger: false,
      name: '',
      updateImage: 0,
      show: null
    }
  }

  browseImage = event => {
    event.persist()
    console.log(event.target.id)
    if (event.target.id === 'plus' && this.state.updateImage < 4) {
      console.log('browseImage')
      console.log(this.state.updateImage)
      this.setState(state => ({
        updateImage: state.updateImage + 1
      }))
    } else if (event.target.id === 'minus' && this.state.updateImage > 0) {
      console.log('browseImage')
      console.log(this.state.updateImage)
      this.setState(state => ({
        updateImage: state.updateImage - 1
      }))
    }
  }

  setShow = event => {
    event.persist()
    console.log(event.target.id)
    this.setState({ show: event.target.id })
  }

  render () {
    if (this.state.backToWagger === true) {
      return <Redirect to='/wagger' />
    }
    return (
      <div className='full-view'>
        <div className='quadrant'>
          <EditProfile
            setShow={this.setShow}
            matches={this.props.matches}
            signOut={this.props.signOut}
          />
        </div>
        <div className='quadrant'>
          <MyImages
            browseImage={this.browseImage.bind(this)}
            image={this.props.images[this.state.updateImage]}
          />
        </div>
        <div className='quadrant'>
          <UpdateProfile
            updateShow={this.updateShow}
            show={this.state.show}
            number={this.state.updateImage}
            speak={this.props.speak}
            name={this.props.name}
            user={this.props.user}
            setUser={this.props.setUser}
            setState={this.setState.bind(this)}
            token={this.props.token}
            showMessage={this.props.showMessage}
          />
        </div>
        <div className='quadrant'>
          <BackToWagger
            setState={this.setState.bind(this)}
            name={this.props.name}
            speak={this.props.speak}
            number={this.state.updateImage}
          />
        </div>
      </div>
    )
  }
}

export default FullProfile
