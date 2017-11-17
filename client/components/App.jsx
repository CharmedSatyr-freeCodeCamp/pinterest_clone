'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//App
import NavBar from './NavBar.jsx'
import NewPopupBtn from './NewPopupBtn.jsx'
import Popup from './Popup.jsx'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'
import { start } from '../controllers/socket.client.jsx'

/*** MAIN ***/
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      popup: false
    }
    this.showPopup = this.showPopup.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }
  start() {
    start(1000, response => {
      console.log(response)
    })
  }
  showPopup() {
    this.setState({
      popup: true
    })
  }
  closePopup() {
    this.setState({
      popup: false
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
        {/*POPUP*/
        this.state.popup ? (
          <div className="container">
            <Popup
              className="popup"
              close={() => {
                this.closePopup()
              }}
            />
          </div>
        ) : null}
        <NewPopupBtn
          show={() => {
            this.showPopup()
          }}
        />
      </div>
    )
  }
}
