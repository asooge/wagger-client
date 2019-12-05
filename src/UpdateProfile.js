import React from 'react'
// import { Redirect } from 'react-router-dom'
import apiConfig from './apiConfig'
import axios from 'axios'
const FormData = require('form-data')

const authContainer = {
  display: 'flex',
  alignItem: 'center'
}

const formStyle = {
  display: 'block',
  margin: 'auto'
}

class UpdateProfile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      name: this.props.name,
      file: '',
      speak: this.props.speak
    }
  }
    handleInput = (event) => {
      event.persist()
      this.setState({ [event.target.name]: event.target.value })
    }

    updateUser = event => {
      event.preventDefault()
      console.log('update user')
      console.log(event.target.name)
      if (event.target.name.name === 'name') {
        axios.post(`${apiConfig}/users/${this.props.user}/name`, { name: this.state.name })
          .then(res => {
            this.setState({ name: '' })
            this.props.setUser({ user: res.data.user })
          })
          .catch(() => {
            this.setState({ name: '' })
            this.props.showMessage('request')
          })
      } else if (event.target.name === 'speak') {
        axios.post(`${apiConfig}/users/${this.props.user}/speak`, { speak: this.state.speak })
          .then(res => {
            this.setState({ speak: '' })
            this.props.setUser({ user: res.data.user })
          })
          .catch(() => {
            this.setState({ speak: '' })
            this.props.showMessage('request')
          })
      } else if (event.target.name === 'file' && this.props.number === 0) {
        axios.patch(`${apiConfig}/users/${this.props.user}/profile`, new FormData(event.target))
          .then(res => {
            this.setState({ file: '' })
            this.props.setUser({ user: res.data.user })
          })
          .catch(() => {
            this.setState({ file: '' })
            this.props.showMessage('image')
          })
      } else if (event.target.name === 'file' && this.props.number > 0) {
        axios.patch(`${apiConfig}/users/${this.props.user}/images/${this.props.number - 1}`, new FormData(event.target))
          .then(res => {
            this.setState({ file: '' })
            this.props.setUser({ user: res.data.user })
          })
          .catch(() => {
            this.setState({ file: '' })
            this.props.showMessage('image')
          })
      } else if (event.target.name === 'password') {
        const data = {
          passwords: {
            old: this.state.oldPassword,
            new: this.state.newPassword
          }
        }
        axios({
          method: 'patch',
          url: `${apiConfig}/change-password`,
          data: data,
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
          .then(res => {
            console.log(res)
            console.log('password updated')
            this.setState({ oldPassword: '', newPassword: '', confirmPassword: '' })
            this.props.showMessage('password-success')
          })
          .catch(() => {
            this.setState({ oldPassword: '', newPassword: '', confirmPassword: '' })
            this.props.showMessage('request')
          })
      }
    }

    render () {
      // if reRender: true, Redirect to '/profile'
      // if show: 'name' return name form
      if (this.props.show === 'name') {
        return (
          <div style={authContainer}className='quadrant'>
            <form name='name' onSubmit={this.updateUser}>
              <label htmlFor='name'>What is your dog name?</label>
              <br />
              <input onInput={this.handleInput} name='name' value={this.state.name} placeholder='enter your dog name' />
              <button>Submit</button>
            </form>
          </div>
        )
      }
      // if show: 'image' return the image form
      if (this.props.show === 'image') {
        return (
          <div style={authContainer}className='quadrant'>
            <form name='file' onSubmit={this.updateUser}>
              <h3>Update your profile and dog images</h3>
              <label htmlFor='images'>Update photo: {this.props.number}</label>
              <br />
              <input type='file' encType='multipart/form-data' onInput={this.handleInput} name='file' value={this.state.file} placeholder='dog pictures' />
              <button>Submit</button>
            </form>
          </div>
        )
      }
      // if show: 'speak' return the speak form
      if (this.props.show === 'speak') {
        return (
          <div style={authContainer}className='quadrant'>
            <form name='speak' onSubmit={this.updateUser}>
              <p>Say something about your dog. Limit 300 characters.</p>
              <label htmlFor='speak'>Speak: </label>
              <br />
              <textarea rows="5" cols="50" onInput={this.handleInput} maxLength='300' name='speak' value={this.state.speak} placeholder='woof' />
              <button>Submit</button>
            </form>
          </div>
        )
      }
      // if show: 'password' return the password form
      if (this.props.show === 'password') {
        return (
          <div style={authContainer}className='quadrant'>
            <form style={formStyle} name='password' onSubmit={this.updateUser}>
              <label htmlFor='old-pass'>Old Password: </label>
              <input onInput={this.handleInput} name='oldPassword' type='password' value={this.state.oldPassword} placeholder='enter your password' />
              <br />
              <label htmlFor='new-pass'>New Password: </label>
              <input type='password' onInput={this.handleInput} name='newPassword' value={this.state.newPassword}placeholder='enter email' />
              <br />
              <label htmlFor='confirm-pass'>Confirm: </label>
              <input type='password' onInput={this.handleInput} name='confirmPassword' value={this.state.confirmPassword} placeholder='enter password' />
              <br />
              <button>Submit</button>
            </form>
          </div>
        )
      }
      return ''
    }
}

export default UpdateProfile
