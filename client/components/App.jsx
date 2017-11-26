'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semanti UI
import { Divider } from 'semantic-ui-react'

//App
import NavBar from './NavBar.jsx'
import NewPinBtn from './NewPinBtn.jsx'
import PinGrid from './PinGrid.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { start } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedUser: 'Stranger',
      allPins: []
    }
  }
  start(user) {
    const cb1 = response => {
      console.log(response)
    }
    const cb2 = response => {
      if (response !== this.state.allPins) {
        this.setState({ allPins: response })
      }
    }
    start(1000, cb1, cb2)
    console.log('Welcome, ' + user + '!')
  }
  loggedUser() {
    f('GET', '/api/users/logged', response => {
      this.setState({ loggedUser: response })
      //Start web socket updates
      this.start(response)
    })
  }
  componentWillMount() {
    this.loggedUser()
  }
  render() {
    return (
      <div>
        <NavBar />
        <p>
          I think you are my favorite React app because you are the very last I need to do for a
          while.
        </p>
        <NewPinBtn owner={this.state.loggedUser} />
        <Divider />
        <PinGrid allPins={this.state.allPins} loggedUser={this.state.loggedUser} />
      </div>
    )
  }
}
