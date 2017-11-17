'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Container, Divider, Dropdown, Grid, Image, List, Menu, Segment } from 'semantic-ui-react'

/*** MAIN ***/
export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            {/*<Image size="mini" src="/logo.png" style={{ marginRight: '1.5em' }} />*/}
            Charmed Pins
          </Menu.Item>
          <Menu.Item as="a">Home</Menu.Item>

          <Dropdown item simple text="Dropdown">
            <Dropdown.Menu>
              <Dropdown.Item>Log Out</Dropdown.Item>
              <Dropdown.Item>All Pins</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Various Monstrosities</Dropdown.Header>
              <Dropdown.Item>
                <i className="dropdown icon" />
                <span className="text">Poo</span>
                <Dropdown.Menu>
                  <Dropdown.Item>Cool</Dropdown.Item>
                  <Dropdown.Item>Penn Jillette</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
    )
  }
}
