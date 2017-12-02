'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import Footer from './Footer.jsx'
import LoginBar from './LoginBar.jsx'
import PinGrid from './PinGrid.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
/*** MAIN ***/
export default class SignupLoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPins: []
    }
  }
  componentWillMount() {
    //Get current allPins, but no autoupdate like in App.jsx
    f('GET', '/api/allPins', response => {
      this.setState({ allPins: response })
    })
  }
  render() {
    return (
      <div>
        <LoginBar />
        <PinGrid gridPins={this.state.allPins} />
        <Footer />
      </div>
    )
  }
}
