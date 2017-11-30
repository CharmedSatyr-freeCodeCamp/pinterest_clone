'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Container, Image, Menu } from 'semantic-ui-react'

//App
import NewPinBtn from './NewPinBtn.jsx'

/*** RESOURCES ***/
//Satyr
import satyr from '../img/favicon.ico'

/*** MAIN ***/
const NavBar = ({ loggedUser, showAllPins, showLoggedUserPins }) => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          {<Image size="mini" src={satyr} style={{ marginRight: '1.5em' }} />}
          Welcome, {loggedUser}
        </Menu.Item>
        <Menu.Item>
          <NewPinBtn owner={loggedUser} />
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
