'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import Footer from './Footer.jsx'
import Loader from './Loader.jsx'
import LoginBar from './LoginBar.jsx'
import PinWall from './PinWall.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
/*** MAIN ***/
export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPins: [],
      loading: true
    }
  }
  componentDidMount() {
    /* Wizard loader shows in HTML/CSS before React has rendered or if JS is
     * disabled. This function artificially extends page load time to
     * allow more user-generated images to fully load.
     * Also, the wizard loader is cool and users should see it... */
    setTimeout(() => this.setState({ loading: false }), 2000)
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
    const { allPins, loading } = this.state

    if (loading) {
      return (
        <div>
          <LoginBar />
          <Loader />
          <Footer />
        </div>
      )
    }

    return (
      <div>
        <LoginBar />
        <PinWall logged={false} wallPins={allPins} />
        <Footer />
      </div>
    )
  }
}
