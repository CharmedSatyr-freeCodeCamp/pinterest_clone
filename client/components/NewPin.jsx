'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button, Image, Input } from 'semantic-ui-react'

//App
import dummy from '../img/image.png'

/*** MAIN ***/
export default class NewPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add a Title!',
      image: dummy
    }
    this.handleTitle = this.handleTitle.bind(this)
    this.handleImg = this.handleImg.bind(this)
  }
  handleTitle() {
    const title = document.getElementById('pinTitle').value
    this.setState({
      title: title
    })
  }
  handleImg() {
    const image = document.getElementById('pinImg').value
    this.setState({
      image: image
    })
    console.log(image)
  }
  render() {
    return (
      <div className="newpin">
        <h1 className="center">{this.state.title}</h1>
        <Image src={this.state.image} />
        <br />
        <Input id="pinTitle" placeholder="Title" onChange={this.handleTitle} />
        <br />
        <Input id="pinImg" placeholder="https://www.img-site.com" onChange={this.handleImg} />
        <br />
        <Button
          onClick={() => {
            console.log('submit')
          }}
        >
          Submit
        </Button>
      </div>
    )
  }
}
