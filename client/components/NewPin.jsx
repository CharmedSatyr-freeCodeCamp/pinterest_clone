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
      image: dummy
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleImg = this.handleImg.bind(this)
  }
  handleClose() {
    this.setState({ modalOpen: false })
  }
  handleImg() {
    const image = document.getElementById('pinImg').value
    //URL is validated by validator package
    if (isURL(image)) {
      this.setState({
        image: image
      })
    }
  }
  handleOpen() {
    this.setState({ modalOpen: true })
  }
  handleSubmit() {
    const obj = {
      title: this.state.title !== 'Add a Title!' ? this.state.title : 'Untitled',
      img: this.state.image,
      owner: this.props.loggedUser
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('POST', '/api/savePin/' + data, response => {
      //console.log(response)
      this.handleClose()
    })
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
            content="New Pin"
            onClick={() => {
              this.handleOpen()
            }}
            icon="plus"
          />
        }
      >
        <Modal.Header>New Pin</Modal.Header>
        <Modal.Content>
          <div className="newpin">
            <Header as="h1" textAlign="center">
              {this.state.title}
            </Header>
            <Image src={this.state.image} />
            <br />
            <Input id="pinTitle" placeholder="Enter a short title" onChange={this.handleTitle} />
            <br />
            <Input
              id="pinImg"
              placeholder="https://www.website.com/photo.jpg"
              onChange={this.handleImg}
            />
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
