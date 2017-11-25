'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Header, Icon, Image } from 'semantic-ui-react'

//App
import dummy from '../img/image.png'

/*** FUNCTIONS ***/
//Validate image URLs
import isURL from 'validator/lib/isURL'

//Broken image fix on error
const addDefaultSrc = e => {
  e.target.src = dummy
}

/*** MAIN ***/
const Pin = ({ title, img }) => {
  let url = isURL(img)
  return (
    <div>
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      <Image src={url ? img : dummy} onError={addDefaultSrc} />
      <Icon name="retweet" />
      <Icon name="empty heart" />
    </div>
  )
}

export default Pin
