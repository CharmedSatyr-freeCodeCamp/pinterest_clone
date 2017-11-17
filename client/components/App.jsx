'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import NavBar from './NavBar.jsx'
import NewPopupBtn from './NewPopupBtn.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { start } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  start() {
    start(1000, response => {
      console.log(response)
    })
  }
  componentWillMount() {
    this.start()
  }
  render() {
    return (
      <div>
        <NavBar />
        <p>
          I think you are my favorite React app because you are the very last I need to do for a
          while.
        </p>
        <NewPopupBtn />
      </div>
    )
  }
}
