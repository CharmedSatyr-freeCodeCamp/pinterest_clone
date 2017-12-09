'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Button, Header, Image, Input, Modal } from 'semantic-ui-react'

/*** Image ***/
//Dummy Image
import dummy from '../img/image.png'

/*** FUNCTIONS ***/
//Common
import { f } from '../../common/common.functions.js'

//Validate image URLs
import isURL from 'validator/lib/isURL'
import blacklist from 'validator/lib/blacklist'

/*** MAIN ***/
export default class NewPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      title: 'Add a Title!',
      image: dummy,
      error: ''
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleImg = this.handleImg.bind(this)
  }
  handleClose() {
    this.setState({ image: dummy, modalOpen: false, title: 'Add a Title!' })
  }
  handleImg() {
    const image = document.getElementById('pinImg').value
    //URL is validated by validator package. Must be HTTPS protocol.
    const options = { protocols: ['https'], require_protocol: true }
    if (isURL(image, options)) {
      this.setState({
        image: image
      })
      return true
    } else {
      return false
    }
  }
  handleOpen() {
    this.setState({ modalOpen: true })
  }
  handleSubmit() {
    if (this.handleImg()) {
      const obj = {
        title: this.state.title !== 'Add a Title!' ? this.state.title : 'Untitled',
        img: this.state.image,
        owner: this.props.loggedUser
      }
      const data = encodeURIComponent(JSON.stringify(obj))
      f('POST', '/api/savePin/' + data, response => {
        //console.log(response)
        this.handleClose()
        this.setState({ error: '' })
      })
    } else {
      //Prompt user for HTTPS link on failed submission.
      const text = 'Make sure your link starts with "https"!'
      this.setState({
        error: text
      })
    }
  }
  handleTitle() {
    //Title can be no more than 40 characters and can't contain `{}<>`
    const title = document.getElementById('pinTitle').value
    const safe = blacklist(title, '\\{\\}\\<\\>')
    const t = safe.split('').length
    if (t <= 40) {
      this.setState({
        title: safe
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true
    } else {
      return false
    }
  }
  render() {
    return (
      <Modal
        closeIcon
        onClose={() => {
          this.handleClose()
        }}
        open={this.state.modalOpen}
        size="mini"
        trigger={
          <Button
            color="blue"
            content="New Card"
            onClick={() => {
              this.handleOpen()
            }}
            icon="plus"
          />
        }
      >
        <Modal.Header>New Card</Modal.Header>
        <Modal.Content>
          <div className="newpin">
            <Header as="h1" textAlign="center">
              {this.state.title}
            </Header>
            <Image alt={this.state.title} src={this.state.image} />
            <br />
            <Input id="pinTitle" placeholder="Enter a short title" onChange={this.handleTitle} />
            <br />
            <Input
              id="pinImg"
              placeholder="https://www.website.com/photo.jpg"
              onChange={this.handleImg}
            />
            <div style={{ color: 'red', textAlign: 'center', margin: 7 }}>
              <strong>{this.state.error}</strong>
            </div>
            <br />
            <Button
              color="blue"
              onClick={() => {
                this.handleSubmit()
              }}
            >
              Submit
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    )
  }
}
