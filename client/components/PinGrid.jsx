'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Grid } from 'semantic-ui-react'

//App
import Pin from './Pin.jsx'

/*** MAIN ***/
const PinGrid = ({ allPins, loggedUser }) => {
  const all = allPins.map((item, index) => {
    return (
      <Grid.Column key={index}>
        <Pin title={item.title} img={item.img} owner={item.owner} loggedUser={loggedUser} />
      </Grid.Column>
    )
  })
  return (
    <Grid container celled stackable columns={3}>
      {all}
    </Grid>
  )
}

export default PinGrid
