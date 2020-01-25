import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const boxStyle = {
  border: 'solid black 1px',
  float: 'right',
  height: '268px',
  overflow: 'scroll'
}

const AllMatches = props => {
  const jsx = props.matches.map(match => (
    <Link key={match._id} to={`/match/${match.reference._id}`}><div>{match.reference.name}</div></Link>
  ))
  return (
    <div style={boxStyle}>
      <h3>All Matches: </h3>
      {jsx}
    </div>
  )
}

export default withRouter(AllMatches)
