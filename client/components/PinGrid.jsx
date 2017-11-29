'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Grid } from 'semantic-ui-react'

//App
import Pin from './Pin.jsx'

/*** MAIN ***/
const PinGrid = ({ gridPins, loggedUser }) => {
  const show = gridPins.map((item, index) => {
    //Check to see if the loggedUser liked the Pin already
    const loggedUserLike = item.likes.indexOf(loggedUser) >= 0 ? true : false

    return (
      <Grid.Column key={index}>
        <Pin
          title={item.title}
          img={item.img}
          owner={item.owner}
          likes={item.likes}
          loggedUser={loggedUser}
          loggedUserLike={loggedUserLike}
        />
      </Grid.Column>
    )
  })
  return (
    <Grid container celled="internally" stackable columns={3}>
      {show}
    </Grid>
  )
}

export default PinGrid
