import React from 'react'
// const FormData = require('form-data')

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
      name: '',
      file: '',
      speak: this.props.speak
    }
  }
    handleInput = (event) => {
      event.persist()
      console.log(event.target.name)
      this.setState({ [event.target.name]: event.target.value })
    }

    render () {
      // if show: 'name' return name form
      if (this.props.show === 'name') {
        return (
          <div style={authContainer}className='quadrant'>
            <form name='name' onSubmit={this.sendData}>
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
            <form name='file' onSubmit={this.sendData}>
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
            <form name='speak' onSubmit={this.sendData}>
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
            <form style={formStyle} name='user' onSubmit={this.sendData}>
              <label htmlFor='old-pass'>Old Password: </label>
              <input onInput={this.handleInput} name='oldPassword' value={this.state.oldPassword}placeholder='enter your password' />
              <br />
              <label htmlFor='new-pass'>New Password: </label>
              <input type='password' onInput={this.handleInput} name='newPassword' value={this.state.newPassword}placeholder='enter email' />
              <br />
              <label htmlFor='confirm-pass'>Confirm: </label>
              <input type='password' onInput={this.handleInput} name='confirmPassword' value={this.state.confirmPassword} placeholder='enter password' />
              <br />
            </form>
          </div>
        )
      }
      return ''
    }
}

export default UpdateProfile
