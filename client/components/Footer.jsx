'use strict'

/*** COMPONENTS ***/
//React
import React from 'react'

//Semantic UI React
import { Container, Icon, Menu } from 'semantic-ui-react'

/*** MAIN ***/
const Footer = () => {
  return (
    <Menu fixed="bottom" inverted>
      <Container>
        <Menu.Item as="a" href="https://github.com/CharmedSatyr/pinterest_clone/" target="_blank">
          Designed and built by CharmedSatyr
          <Icon name="github" />
        </Menu.Item>
        <Menu.Item
          as="a"
          href="https://github.com/CharmedSatyr/pinterest_clone/blob/master/LICENSE"
          target="_blank"
        >
          Code licensed under GPL-3.0
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Footer
