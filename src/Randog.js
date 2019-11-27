import React from 'react'

class Randog extends React.Component {
  constructor () {
    super()
    this.state = {
      randogs: [],
      randomNum: null
    }
  }
  render () {
    return (
      <div className='quadrant'>
        <h1>Random Dog Gif</h1>
      </div>
    )
  }
}

export default Randog
