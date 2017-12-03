'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Button, Header, Container, Image, Icon, Menu, Modal } from 'semantic-ui-react'

/*** RESOURCES ***/
//Satyr
import glowsatyr from '../img/Glowing-Black-Satyr.png'
import satyr from '../img/Black-Satyr.png'

/*** MAIN ***/
const LoginBar = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header style={{ fontSize: '120%' }} className="fantasyFont">
          <Image alt="Glowing Black Satyr" src={glowsatyr} className="navSatyr" />
          Welcome to Sorcerer City, a fantasy-themed Pinterest clone built for freeCodeCamp
        </Menu.Item>
        <Modal
          size="mini"
          trigger={
            <Menu.Item as="a" position="right">
              Login
            </Menu.Item>
          }
        >
          <Image alt="Satyr logo" centered height="75px" src={satyr} style={{ marginTop: 12 }} />
          <Modal.Header>
            <Header textAlign="center" className="fantasyFont">
              Welcome to Sorcerer City
            </Header>
          </Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header as="h3" textAlign="center" style={{ marginBottom: -2 }}>
                Click below to log in.
              </Header>
              <br />
            </Modal.Description>
            <Button fluid color="grey" href="/auth/github">
              <Icon name="github" />Continue with GitHub
            </Button>
            <br />
            <Button fluid color="twitter" href="/auth/twitter">
              <Icon name="twitter" />Continue with Twitter
            </Button>
          </Modal.Content>
        </Modal>
      </Container>
    </Menu>
  )
}

export default LoginBar
