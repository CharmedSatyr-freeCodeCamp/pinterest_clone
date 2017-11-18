'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import NavBar from './NavBar.jsx'
import NewPinBtn from './NewPinBtn.jsx'
import NewPin from './NewPin.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { start } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newpin: false
    }
    this.showNewPin = this.showNewPin.bind(this)
    this.closeNewPin = this.closeNewPin.bind(this)
  }
  start() {
    start(1000, response => {
      console.log(response)
    })
  }
  showNewPin() {
    this.setState({
      newpin: true
    })
  }
  closeNewPin() {
    this.setState({
      newpin: false
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
        {/*New Pin*/
        this.state.newpin ? (
          <NewPin
            className="newpin"
            close={() => {
              this.closeNewPin()
            }}
          />
        ) : null}
        <NewPinBtn
          show={() => {
            this.showNewPin()
          }}
        />
      </div>
    )
  }
}
