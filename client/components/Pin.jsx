'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Header, Icon, Image } from 'semantic-ui-react'

//App
import dummy from '../img/image.png'

/*** FUNCTIONS ***/
//Common
import { f } from '../../common/common.functions.js'

//Validate image URLs
import isURL from 'validator/lib/isURL'

//Broken image fix on error
const addDefaultSrc = e => {
  e.target.src = dummy
}

/*** MAIN ***/
const Pin = ({ title, img, owner, loggedUser }) => {
  let url = isURL(img)
  return (
    <span>
      {loggedUser === owner ? (
        <Icon
          link
          name="remove"
          color="red"
          size="large"
          onClick={() => {
            const obj = {
              title: title,
              img: img,
              owner: owner
            }
            const data = encodeURIComponent(JSON.stringify(obj))
            f('DELETE', '/api/deletePin/' + data, response => {
              console.log(response)
            })
          }}
        />
      ) : null}
      <Header as="h1" textAlign="center">
        {title}
      </Header>
      <Image src={url ? img : dummy} onError={addDefaultSrc} />
      <Icon link name="retweet" size="large" />
      <Icon link name="empty heart" size="large" />
      {owner}
    </span>
  )
}

export default Pin
