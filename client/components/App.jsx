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

//App
import Footer from './Footer.jsx'
import NavBar from './NavBar.jsx'
import PinWall from './PinWall.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { start } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logged: true,
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
    //Indicates Web Socket connection
    const cb1 = response => {
      if (DEV) {
        console.log(response)
      }
    }
    //Keeps allPins up to date for all users without browser refresh
    const cb2 = response => {
      /* Update only if the two arrays of objects are different. *
       * Checking for string equality here is a quick, easy test.*/
      if (JSON.stringify(response) !== JSON.stringify(this.state.allPins)) {
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
    const { allPins, logged, loggedUser, showLoggedUserPins } = this.state
    //Filter allPins for those made by the loggedUser
    const loggedUserPins = allPins.filter(item => {
      return item.owner === loggedUser
    })
    return (
      <div>
        <header>
          <nav>
            <NavBar
              showAllPins={this.showAllPins}
              showLoggedUserPins={this.showLoggedUserPins}
              loggedUser={loggedUser}
            />
          </nav>
        </header>
        <main>
          {showLoggedUserPins ? (
            <PinWall logged={logged} wallPins={loggedUserPins} loggedUser={loggedUser} />
          ) : (
            <PinWall logged={logged} wallPins={allPins} loggedUser={loggedUser} />
          )}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    )
  }
}
