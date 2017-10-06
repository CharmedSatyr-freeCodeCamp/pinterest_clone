'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button, Icon } from 'semantic-ui-react'

//App
const ButtonExample = () => {
  return (
    <Button animated>
      <Button.Content visible>Next</Button.Content>
      <Button.Content hidden>
        <Icon name="right arrow" />
      </Button.Content>
    </Button>
  )
}

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <p>
          I think you are my favorite React app because you are the very last I need to do for a
          while.
        </p>
        <ButtonExample />
      </div>
    )
  }
}
