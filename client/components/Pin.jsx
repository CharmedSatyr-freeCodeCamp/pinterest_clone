'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Header, Icon, Image, Transition } from 'semantic-ui-react'

/*** FUNCTIONS ***/
//Common
import { f } from '../../common/common.functions.js'

//Validate image URLs
import isURL from 'validator/lib/isURL'

/*** RESOURCES ***/
//Dummy Image
import dummy from '../img/image.png'

/*** MAIN ***/
export default class Pin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      /*empty and full are used for the Like/Unlike animation - directly  *
       *checking this.props.loggedUserLike in <Transition/> doesn't work  */
      empty: !this.props.loggedUserLike,
      full: this.props.loggedUserLike
    }
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.toggleLikePin = this.toggleLikePin.bind(this)
  }
  //Broken image fix on error
  addDefaultSrc(e) {
    e.target.src = dummy
  }
  deletePin() {
    const obj = {
      title: this.props.title,
      img: this.props.img,
      owner: this.props.loggedUser
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('DELETE', '/api/deletePin/' + data, response => {
      //console.log(response)
    })
  }
  toggleLikePin() {
    const obj = {
      title: this.props.title,
      img: this.props.img,
      owner: this.props.owner,
      loggedUser: this.props.loggedUser
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('POST', 'api/toggleLikePin/' + data, response => {
      //console.log(response)
    })
  }
  render() {
    let url = isURL(this.props.img)
    return (
      <div>
        {/* Only show the Remove button to the pin's owner */}
        <Header as="h3" textAlign="center">
          {this.props.title}
          {this.props.loggedUser === this.props.owner ? (
            <Icon
              link
              fitted
              name="remove"
              color="red"
              size="large"
              onClick={() => {
                this.deletePin()
              }}
              style={{
                float: 'right',
                marginLeft: -25,
                marginRight: 0,
                marginTop: 0,
                marginBottom: 0,
                padding: 0
              }}
            />
          ) : null}
        </Header>
        <Image src={url ? this.props.img : dummy} onError={this.addDefaultSrc} />

        {/* Like button */}
        {this.props.loggedUserLike ? (
          <Transition animation={'pulse'} duration={500} visible={this.state.full}>
            <Icon
              link
              name="heart"
              size="large"
              color="red"
              onClick={() => {
                this.toggleLikePin()
              }}
            />
          </Transition>
        ) : (
          <Transition animation={'pulse'} duration={500} visible={this.state.empty}>
            <Icon
              link
              name="empty heart"
              size="large"
              onClick={() => {
                this.toggleLikePin()
              }}
            />
          </Transition>
        )}
        {this.props.likes.length}
        <span style={{ float: 'right' }}>{this.props.owner}</span>
      </div>
    )
  }
}
