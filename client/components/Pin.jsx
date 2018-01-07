'use strict'

/*** ENVIRONMENT ***/
import dotenv from 'dotenv'
dotenv.load()

/*** DEVELOPMENT TOOLS ***/
const DEV = process.env.NODE_ENV === 'development'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Button, Card, Image, Modal, Transition } from 'semantic-ui-react'

//App
import Like from './Like.jsx'

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
    this.state = { modalOpen: false }
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.toggleLikePin = this.toggleLikePin.bind(this)
  }
  //Broken image fix on error
  addDefaultSrc(e) {
    e.target.src = dummy
  }
  deletePin() {
    const { title, img, loggedUser } = this.props
    const obj = {
      img: img,
      owner: loggedUser,
      title: title
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('DELETE', '/api/deletePin/' + data, response => {
      if (DEV) {
        console.log(response)
      }
      this.handleClose()
    })
  }
  handleClose() {
    this.setState({ modalOpen: false })
  }
  handleOpen() {
    this.setState({ modalOpen: true })
  }
  toggleLikePin() {
    const { img, loggedUser, owner, title } = this.props
    const obj = {
      img: img,
      loggedUser: loggedUser,
      owner: owner,
      title: title
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('POST', 'api/toggleLikePin/' + data, response => {
      if (DEV) {
        console.log(response)
      }
    })
  }
  render() {
    const { img, likes, logged, loggedUser, loggedUserLike, owner, title } = this.props
    //URL is validated by validator package. Must be HTTPS protocol.
    const options = { protocols: ['https'], require_protocol: true }
    const url = isURL(img, options)
    return (
      <Card raised style={{ margin: 5 }}>
        {/* Card displays preview image and details, which trigger a
          * large image Modal and details onClick */}
        <Modal
          closeIcon
          onClose={this.handleClose}
          open={this.state.modalOpen}
          size="small"
          trigger={
            <Image
              alt={title}
              onClick={() => {
                this.handleOpen()
              }}
              onError={this.addDefaultSrc}
              src={url ? img : dummy}
            />
          }
        >
          {/* Large image that appears onClick */}
          <Image
            alt={title}
            centered
            onError={this.addDefaultSrc}
            src={url ? img : dummy}
            style={{ width: '100%' }}
          />
          <Modal.Header>
            {title}
            {/* Only show the Remove button to the pin's owner */}
            {loggedUser === owner ? (
              <Button
                floated="right"
                onClick={() => {
                  this.deletePin()
                }}
                negative
                style={{ marginTop: -5 }}
              >
                Delete Card
              </Button>
            ) : null}
          </Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {/* Like button */}
              <Like
                img={img}
                likes={likes}
                logged={logged}
                loggedUser={loggedUser}
                loggedUserLike={loggedUserLike}
                owner={owner}
                title={title}
              />
              <span style={{ float: 'right' }}>{owner}</span>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Card.Content extra>
          <Card.Header textAlign="center">{title}</Card.Header>
          {/* Like button */}
          <Like
            img={img}
            likes={likes}
            logged={logged}
            loggedUser={loggedUser}
            loggedUserLike={loggedUserLike}
            owner={owner}
            title={title}
          />
          <span style={{ float: 'right' }}>{owner}</span>
        </Card.Content>
      </Card>
    )
  }
}
