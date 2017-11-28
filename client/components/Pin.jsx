'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Header, Icon, Image } from 'semantic-ui-react'

//App
import dummy from '../img/image.png'

/*** FUNCTIONS ***/
//Common
import { f } from '../../common/common.functions.js'

//Validate image URLs
import isURL from 'validator/lib/isURL'

/*** MAIN ***/
export default class Pin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //likes: this.props.likes.length,
      //loggedUserLike: this.props.loggedUserLike
      //loggedUserShare: false
    }
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
    this.toggleLikePin = this.toggleLikePin.bind(this)
    //this.share = this.share.bind(this)
    //this.unshare = this.unshare.bind(this)
  }
  //Broken image fix on error
  addDefaultSrc(e) {
    e.target.src = dummy
  }
  toggleLikePin() {
    /*These state changes are *only* required       *
     *to make the Like button respond more quickly. *
     *Database information about Likes is passed via*
     *props and automatically saves/updates. Not    *
     *using because of a bug - Likes wrongly keep   *
     *their screen position on add/delete Pin.      */
    /*if (this.state.loggedUserLike === false) {
      this.setState({
        likes: this.state.likes + 1,
        loggedUserLike: true
      })
    } else {
      this.setState({
        likes: this.state.likes - 1,
        loggedUserLike: false
      })
    }*/
    const obj = {
      title: this.props.title,
      img: this.props.img,
      owner: this.props.loggedUser,
      loggedUser: this.props.loggedUser
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('POST', 'api/toggleLikePin/' + data, response => {
      //console.log(response)
    })
  }
  //share() {}
  //unshare() {}
  render() {
    let url = isURL(this.props.img)
    return (
      <span>
        {/* Only show the Remove button to the pin's owner */}
        {this.props.loggedUser === this.props.owner ? (
          <Icon
            link
            name="remove"
            color="red"
            size="large"
            onClick={() => {
              const obj = {
                title: this.props.title,
                img: this.props.img,
                owner: this.props.loggedUser
              }
              const data = encodeURIComponent(JSON.stringify(obj))
              f('DELETE', '/api/deletePin/' + data, response => {
                console.log(response)
              })
            }}
          />
        ) : null}
        <Header as="h1" textAlign="center">
          {this.props.title}
        </Header>
        <Image src={url ? this.props.img : dummy} onError={this.addDefaultSrc} />

        {/* Share button
        <Icon link name="retweet" size="large" />
        {this.props.shares.length}
        */}
        {/* Like button */}
        {/*this.state.loggedUserLike*/ this.props.loggedUserLike ? (
          <Icon
            link
            name="heart"
            size="large"
            color="red"
            onClick={() => {
              this.toggleLikePin()
            }}
          />
        ) : (
          <Icon
            link
            name="empty heart"
            size="large"
            onClick={() => {
              this.toggleLikePin()
            }}
          />
        )}
        {/*this.state.likes*/}
        {this.props.likes.length}
        <span style={{ float: 'right' }}>{this.props.owner}</span>
      </span>
    )
  }
}
