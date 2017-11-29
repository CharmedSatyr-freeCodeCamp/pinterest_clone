'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button, Header, Image, Input } from 'semantic-ui-react'

/*** Image ***/
//Dummy Image
import dummy from '../img/image.png'

/*** FUNCTIONS ***/
//Common
import { f } from '../../common/common.functions.js'

//Validate image URLs
import isURL from 'validator/lib/isURL'

/*** MAIN ***/
export default class NewPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add a Title!',
      image: dummy,
      owner: this.props.owner
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handleImg = this.handleImg.bind(this)
  }
  handleSubmit() {
    const obj = {
      title: this.state.title !== 'Add a Title!' ? this.state.title : 'Untitled',
      img: this.state.image,
      owner: this.state.owner
    }
    const data = encodeURIComponent(JSON.stringify(obj))
    f('POST', '/api/savePin/' + data, response => {
      //console.log(response)
    })
  }
  handleImg() {
    const image = document.getElementById('pinImg').value
    if (isURL(image)) {
      this.setState({
        image: image
      })
    }
  }
  handleTitle() {
    const title = document.getElementById('pinTitle').value
    this.setState({
      title: title
    })
  }
  render() {
    return (
      <div className="newpin">
        <Header as="h1" textAlign="center">
          {this.state.title}
        </Header>
        <Image src={this.state.image} />
        <br />
        <Input id="pinTitle" placeholder="Title" onChange={this.handleTitle} />
        <br />
        <Input
          id="pinImg"
          placeholder="https://www.website.com/photo.jpg"
          onChange={this.handleImg}
        />
        <br />
        <Button
          onClick={() => {
            this.handleSubmit()
          }}
        >
          Submit
        </Button>
      </div>
    )
  }
}
