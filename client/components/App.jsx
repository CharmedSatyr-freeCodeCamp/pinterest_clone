'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Divider, Header } from 'semantic-ui-react'

//App
import NavBar from './NavBar.jsx'
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
      allPins: [],
      showLoggedUserPins: false,
      showAllPins: true
    }
    this.showAllPins = this.showAllPins.bind(this)
    this.showLoggedUserPins = this.showLoggedUserPins.bind(this)
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
  showAllPins() {
    this.setState({ showAllPins: true, showLoggedUserPins: false })
  }
  showLoggedUserPins() {
    this.setState({ showAllPins: false, showLoggedUserPins: true })
  }
  componentWillMount() {
    this.loggedUser()
  }
  render() {
    //Filter allPins for those made by the loggedUser
    const loggedUserPins = this.state.allPins.filter(item => {
      return item.owner === this.state.loggedUser
    })
    return (
      <div>
        <NavBar
          showAllPins={() => {
            this.showAllPins()
          }}
          showLoggedUserPins={() => {
            this.showLoggedUserPins()
          }}
          loggedUser={this.state.loggedUser}
        />
        {this.state.showLoggedUserPins ? (
          <span>
            <Header as="h1">Your Pins</Header>
            <Divider />
            <PinGrid gridPins={loggedUserPins} loggedUser={this.state.loggedUser} />
          </span>
        ) : (
          <span>
            <Header as="h1">Recent Pins</Header>
            <Divider />
            <PinGrid gridPins={this.state.allPins} loggedUser={this.state.loggedUser} />
          </span>
        )}
      </div>
    )
  }
}
