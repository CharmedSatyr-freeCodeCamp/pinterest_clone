'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Container, Image, Menu } from 'semantic-ui-react'

//App
import NewPin from './NewPin.jsx'

/*** RESOURCES ***/
//Satyr
import glowsatyr from '../img/Glowing-Black-Satyr.png'

/*** MAIN ***/
const NavBar = ({ loggedUser, showAllPins, showLoggedUserPins }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          {<Image size="mini" src={glowsatyr} style={{ marginRight: '1.5em' }} />}
          Welcome, {loggedUser}
        </Menu.Item>
        <Menu.Item>
          <NewPin loggedUser={loggedUser} />
        </Menu.Item>
        <Menu.Item as="a" onClick={showLoggedUserPins}>
          Your Pins
        </Menu.Item>
        <Menu.Item as="a" onClick={showAllPins}>
          Recent Pins
        </Menu.Item>
        <Menu.Item as="a" href="/logout" position="right">
          Log Out
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
