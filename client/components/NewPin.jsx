'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button } from 'semantic-ui-react'

/*** MAIN ***/
export default class NewPin extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="container">
        <div className="newpin">
          <p>Hai who u. Maybe you r all abt adding a post hur</p>
          <Button onClick={this.props.close}>Close</Button>
        </div>
      </div>
    )
  }
}
