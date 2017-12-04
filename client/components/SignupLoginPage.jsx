'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import Footer from './Footer.jsx'
import LoginBar from './LoginBar.jsx'
import PinWall from './PinWall.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
/*** MAIN ***/
export default class SignupLoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPins: [],
      logged: false
    }
  }
  componentWillMount() {
    //Get current allPins, but no autoupdate like in App.jsx
    f('GET', '/api/allPins', response => {
      this.setState({ allPins: response })
    })
  }
  showAllPins() {
    this.setState({ showAllPins: true, showLogin: false })
  }
  showLogin() {
    this.setState({ showAllPins: false, showLogin: true })
  }
  render() {
    const { logged, allPins } = this.state
    return (
      <div>
        <LoginBar />
        <PinWall logged={logged} wallPins={allPins} />
        <Footer />
      </div>
    )
  }
}
