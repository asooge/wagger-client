import React from 'react'
import axios from 'axios'

const imageStyle = {
  height: '268px',
  maxWidth: '478px'
}

class Randog extends React.Component {
  constructor () {
    super()
    this.state = {
      randogs: [1, 2, 3],
      currentDog: Math.floor(Math.random() * 200)
    }
  }
  componentDidMount () {
    axios('https://api.giphy.com/v1/gifs/search?q=dogs&api_key=UW6UfEEO71CGk2AZgexrHeGYiTRAy1GK&rating=g&limit=1000')
      .then((res) => {
        console.log(res)
        console.log(res.data)
        console.log(res.data.data)
        const filterDogs = res.data.data.filter(dog => dog.images.original.width / dog.images.original.height >= 1.05)
        const dogIds = filterDogs.map(dog => dog.id)
        console.log(dogIds)
        const dogUrls = dogIds.map(id => `https://i.giphy.com/media/${id}/giphy.webp`)
        console.log(dogUrls)
        this.setState({ randogs: dogUrls })
        setInterval(() => this.updateDog(), 12000)
      })
      .catch(console.error)
  }
  updateDog () {
    console.log('update successful')
    const randNum = Math.floor(Math.random() * this.state.randogs.length)
    console.log(randNum)
    this.setState({ currentDog: randNum })
  }

  render () {
    if (this.state.currentDog) {
      return (
        <div style={{ margin: 'auto' }} className='quandrant'>
          <img style={imageStyle} src={this.state.randogs[this.state.currentDog]} />
        </div>
      )
    } else {
      return (
        <div className='quadrant'>
          <h1>Random Dog Gif</h1>
        </div>
      )
    }
  }
}

export default Randog
