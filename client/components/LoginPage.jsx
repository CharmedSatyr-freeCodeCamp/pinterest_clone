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
export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allPins: [],
      loading: true
    }
  }
  componentDidMount() {
    /* Artificially extending page load time to show cool loader and
     * allow more user-generated images to fully load.
     * Login.html prefetches main app scripts to avoid this in App.jsx */
    setTimeout(() => this.setState({ loading: false }), 1500)
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

    //This loader html is the same as in login.html and index.html
    if (loading) {
      return (
        <div className="loader">
          <div className="circ">
            <div className="swirl">
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div>
                                <div />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body">
              <div className="hands" />
            </div>
            <div className="head">
              <div className="eye" />
              <div className="nose" />
              <div className="cheeks" />
              <div className="beard" />
            </div>
          </div>
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
