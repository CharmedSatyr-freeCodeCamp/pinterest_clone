'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Button, Header, Image, Input, Modal, Transition } from 'semantic-ui-react'

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
      error: '',
      image: dummy,
      modalOpen: false,
      title: 'Add a Title!',
      visible: false
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleImg = this.handleImg.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
  }
  handleClose() {
    //Toggle visibility to trigger animation
    this.setState({ image: dummy, title: 'Add a Title!', visible: false })
    //close Modal - this will NOT work if chained to setState like in handleOpen
    //Interval on setTimeout === Transition animation length
    setTimeout(() => this.setState({ modalOpen: false }), 250)
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
    //Open Modal and then toggle visilibility to trigger animation
    this.setState({ modalOpen: true }, () => this.setState({ visible: true }))
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
      //Prompt user for valid HTTPS link on failed submission.
      const text = 'Use a valid link that starts with HTTPS'
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
    const { error, image, modalOpen, title, visible } = this.state

    const newPinModal = (
      <Modal
        closeIcon
        onClose={() => {
          this.handleClose()
        }}
        open={modalOpen}
        size="mini"
      >
        <Modal.Header>New Card</Modal.Header>
        <Modal.Content>
          <div className="newpin">
            <Header as="h1" textAlign="center">
              {title}
            </Header>
            <Image alt={title} src={image} />
            <br />
            <Input id="pinTitle" placeholder="Enter a short title" onChange={this.handleTitle} />
            <br />
            <Input
              id="pinImg"
              placeholder="https://www.website.com/photo.jpg"
              onChange={this.handleImg}
            />
            <div style={{ color: 'red', textAlign: 'center', margin: 7 }}>
              <strong>{error}</strong>
            </div>
            <br />
            <Button color="blue" onClick={() => this.handleSubmit()}>
              Submit
            </Button>
          </div>
        </Modal.Content>
      </Modal>
    )

    return (
      <span>
        <Button color="blue" content="New Card" onClick={() => this.handleOpen()} icon="plus" />
        <Transition visible={visible} animation="scale" duration={250}>
          {newPinModal}
        </Transition>
      </span>
    )
  }
}
