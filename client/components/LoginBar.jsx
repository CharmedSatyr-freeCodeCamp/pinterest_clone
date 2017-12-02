'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Container, Image, Icon, Menu } from 'semantic-ui-react'

/*** RESOURCES ***/
//Satyr
import glowsatyr from '../img/Glowing-Black-Satyr.png'

/*** MAIN ***/
const LoginBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          {<Image size="mini" src={glowsatyr} style={{ marginRight: '1.5em' }} />}
          Welcome to Sorcerer City, a fantasy-themed Pinterest clone built for freeCodeCamp
        </Menu.Item>
        <Menu.Item as="a" href="/auth/github" position="right">
          <Icon fitted name="github" /> GitHub
        </Menu.Item>
        <Menu.Item as="a" href="/auth/twitter" position="right">
          <Icon fitted name="twitter" /> Twitter
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default LoginBar
