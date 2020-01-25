import React from 'react'

class Bones extends React.Component {
  constructor () {
    super()
    this.state = {
      clock: new Date() - 1
    }
  }

  componentDidMount () {
    setInterval(() => this.setState({ clock: new Date() - 1 }), 1000)
  }

  clock = (ms) => {
    let sec = Math.floor(ms / 1000)
    const hour = Math.floor(sec / 3600)
    const min = Math.floor((sec % 3600) / 60)
    sec = sec - (hour * 3600) - (min * 60)
    if (hour === 1) {
      return `${hour} hour: ${min} min: ${sec} sec`
    } else {
      return `${hour} hours: ${min} min: ${sec} sec`
    }
  }

  render () {
    return (
      <div>
        <h4>You have reached your dog limit for the day</h4>
        <p>Dog timer: {this.clock((86400000 - (this.state.clock - this.props.time)))}</p>
        <p>Cant wait? give a dog a bone to keep wagging</p>
      </div>
    )
  }
}

export default Bones
