import React from 'react'
import apiConfig from './apiConfig'
import axios from 'axios'

class Messages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: props.data.messages,
      text: ''
    }
  }

  handleInput = event => {
    event.persist()
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios({
      method: 'post',
      url: `${apiConfig}/users/${this.props.me}/matches/${this.props.data.reference._id}/messages`,
      headers: {
        Authorization: `Bearer ${this.props.token}`
      },
      data: { text: this.state.text }
    })
    // axios.post(`${apiConfig}/users/${this.props.me}/matches/${this.props.data.reference._id}/messages`, { text: this.state.text })
      .then(res => {
        this.setState({ text: '' })
        this.props.showMessage('message-success')
        this.props.setUser({ user: res.data.user })
      })
  }

  render () {
    return (
      <div>
        <h1>Messages</h1>
        <div>
          {this.props.data.messages.map(message => <div key={message._id}>{message.text}</div>)}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input name='text' value={this.state.text} onInput={this.handleInput} required/>
          <button>Send</button>
        </form>
      </div>
    )
  }
}

export default Messages
