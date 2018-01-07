'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Masonry
import Masonry from 'react-masonry-component'

//Semantic UI React
import { Container } from 'semantic-ui-react'

//App
import Pin from './Pin.jsx'

/*** MAIN ***/
const PinWall = ({ wallPins, logged, loggedUser }) => {
  const masonryOptions = {
    transitionDuration: 500
  }
  const show = wallPins.map((item, index) => {
    //Check to see if the loggedUser liked the Pin already
    const loggedUserLike = item.likes.indexOf(loggedUser) >= 0 ? true : false

    return (
      <Pin
        key={index}
        img={item.img}
        likes={item.likes}
        logged={logged}
        loggedUser={loggedUser}
        loggedUserLike={loggedUserLike}
        owner={item.owner}
        title={item.title}
      />
    )
  })
  return (
    <Container
      style={{
        width: '74vw',
        marginBottom: '15vh'
      }}
    >
      <Masonry
        style={{
          marginTop: 80
        }}
        options={masonryOptions}
      >
        {show}
      </Masonry>
    </Container>
  )
}

export default PinWall
