'use strict'

/*** ENVIRONMENT ***/
const path = process.cwd()
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'
if (DEV) {
  console.log('Development mode')
}

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
      loggedUser: 'Client',
      allPins: [],
      showLoggedUserPins: false,
      showAllPins: true
    }
    this.loggedUser = this.loggedUser.bind(this)
    this.showAllPins = this.showAllPins.bind(this)
    this.showLoggedUserPins = this.showLoggedUserPins.bind(this)
  }
  start(user) {
    if (DEV) {
      console.log('Calling start function; user:', user)
    }
    //Indicates Web Socket connection - VERBOSE!
    const cb1 = response => {
      if (DEV) {
        console.log(response)
      }
    }
    //Keeps allPins up to date for all users without browser refresh
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
      if (DEV) {
        console.log('Received username:', response)
      }
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
    if (DEV) {
      console.log('Will mount App...')
    }
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
