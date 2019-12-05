import React from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Messages from './Messages'
import axios from 'axios'
import apiConfig from './apiConfig'

const imageStyle = {
  height: '268px',
  maxWidth: '478px',
  display: 'block',
  margin: 'auto'
}

const buttonStyle = {
  display: 'block',
  color: 'red',
  width: '80%',
  height: '26%',
  padding: '0',
  margin: '6.5% auto 0%',
  borderRadius: '5px',
  position: 'relative'
}

class Match extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageIndex: 0,
      toWagger: false,
      toProfile: false
    }
  }
  componentDidMount () {
    this.props.setUser({ instantMatch: false })
  }
  matchObject = this.props.matches.find(match => match.reference._id === this.props.match.params.id)

  matchImages = [this.matchObject.reference.profile].concat(this.matchObject.reference.images)

  deleteMatch = () => {
    axios({
      method: 'delete',
      url: `${apiConfig}/users/${this.props.me}/matches`,
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      data: { match: this.matchObject.reference._id }
    })
      .then(res => {
        axios({
          method: 'get',
          url: `${apiConfig}/users/${this.props.me}`,
          headers: {
            Authorization: `Bearer ${this.props.token}`
          }
        })
        // axios(`${apiConfig}/users/${this.props.me}`)
          .then(res => {
            this.props.showMessage('delete-match')
            this.props.setUser({ user: res.data.user })
          })
      })
      .catch(console.error)
  }

  browseImage = event => {
    event.persist()
    if (event.target.id === 'plus' && this.state.imageIndex < 4) {
      this.setState(state => ({
        imageIndex: state.imageIndex + 1
      }))
    } else if (event.target.id === 'minus' && this.state.imageIndex > 0) {
      this.setState(state => ({
        imageIndex: state.imageIndex - 1
      }))
    }
  }
  render () {
    if (this.state.toWagger) {
      return <Redirect to='/wagger' />
    }
    if (this.state.toProfile) {
      return <Redirect to='/profile' />
    }
    return (
      <div className='full-view'>
        <div className='quadrant'>
          <h1>Its a match!</h1>
          <h1 style={{ display: 'inline-block' }}>{this.matchObject.reference.name}</h1>
          <p>{this.matchObject.reference.speak}</p>
          <button onClick={this.deleteMatch}>Permanently delete match forever</button>
        </div>
        <div className='quadrant'>
          <img style={imageStyle} src={this.matchImages[this.state.imageIndex]} />
          <div id='minus' className='next-image' onClick={this.browseImage} />
          <div id='plus' className='next-image' onClick={this.browseImage} />
        </div>
        <div className='quadrant'>
          <button style={buttonStyle} onClick={() => this.setState({ toWagger: true })}>Back to Wagger</button>
          <button style={buttonStyle} onClick={() => this.setState({ toProfile: true })}>Back to Profile</button>
        </div>
        <div className='quadrant'>
          <Messages
            data={this.matchObject}
            me={this.props.me}
            setUser={this.props.setUser}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Match)
