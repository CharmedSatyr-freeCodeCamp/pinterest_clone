'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button, Header, Image, Input } from 'semantic-ui-react'

/*** FUNCTIONS ***/
import { f } from '../../common/common.functions.js'

//App
import dummy from '../img/image.png'

/*** MAIN ***/
export default class NewPin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Add a Title!',
      image: dummy,
      user: this.props.user
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
        <Input id="pinImg" placeholder="https://www.img-site.com" onChange={this.handleImg} />
        <br />
        <Button
          onClick={() => {
            const obj = {
              title: this.state.title,
              img: this.state.image
            }
            const data = encodeURIComponent(JSON.stringify(obj))
            f('POST', '/api/' + this.state.user + '/savePin/' + data, response => {
              console.log(response)
            })
          }}
        >
          Submit
        </Button>
      </div>
    )
  }
}
