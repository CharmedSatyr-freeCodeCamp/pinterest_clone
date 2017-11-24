'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Header, Image } from 'semantic-ui-react'

/*** MAIN ***/
const Pin = ({ title, img }) => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      <Image src={img} />
    </div>
  )
}

export default Pin
