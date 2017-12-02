'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Card, Icon, Image, Modal, Transition } from 'semantic-ui-react'

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
    this.state = {}
    this.addDefaultSrc = this.addDefaultSrc.bind(this)
    this.deletePin = this.deletePin.bind(this)
    this.toggleLikePin = this.toggleLikePin.bind(this)
  }
  //Broken image fix on error
  addDefaultSrc(e) {
    e.target.src = dummy
  }
  deletePin() {
    const { title, img, loggedUser } = this.props
    const obj = {
      title: title,
      img: img,
      owner: loggedUser
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('DELETE', '/api/deletePin/' + data, response => {
      //console.log(response)
    })
  }
  toggleLikePin() {
    const { title, img, owner, loggedUser } = this.props
    const obj = {
      title: title,
      img: img,
      owner: owner,
      loggedUser: loggedUser
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('POST', 'api/toggleLikePin/' + data, response => {
      //console.log(response)
    })
  }
  render() {
    const { img, likes, logged, loggedUser, loggedUserLike, owner, title } = this.props
    let url = isURL(img)
    return (
      <Card fluid raised>
        {/* Only show the Remove button to the pin's owner */}
        <Modal
          trigger={<Image alt={title} onError={this.addDefaultSrc} src={url ? img : dummy} />}
          closeIcon
        >
          <Image centered alt={title} onError={this.addDefaultSrc} src={url ? img : dummy} />
          <Modal.Header>{title}</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              {/* Like button */}
              <Like
                title={title}
                img={img}
                owner={owner}
                likes={likes}
                logged={logged}
                loggedUser={loggedUser}
                loggedUserLike={loggedUserLike}
              />
              <span style={{ float: 'right' }}>{owner}</span>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <Card.Content extra>
          <Card.Header textAlign="center">
            {title}
            {loggedUser === owner ? (
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
          </Card.Header>
          {/* Like button */}
          <Like
            title={title}
            img={img}
            owner={owner}
            likes={likes}
            logged={logged}
            loggedUser={loggedUser}
            loggedUserLike={loggedUserLike}
          />
          <span style={{ float: 'right' }}>{owner}</span>
        </Card.Content>
      </Card>
    )
  }
}
