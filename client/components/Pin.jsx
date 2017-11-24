'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Header, Icon, Image } from 'semantic-ui-react'

//App
import dummy from '../img/image.png'

/*** MAIN ***/
//Broken Image Fix
const addDefaultSrc = e => {
  e.target.src = dummy
}

const Pin = ({ title, img }) => {
  return (
    <div>
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      <Image src={img} onError={addDefaultSrc} />
      <Icon name="retweet" />
      <Icon name="empty heart" />
    </div>
  )
}

export default Pin
