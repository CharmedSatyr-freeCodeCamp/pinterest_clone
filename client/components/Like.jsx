'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI React
import { Icon, Transition } from 'semantic-ui-react'

/*** FUNCTIONS ***/
//Common
import { f } from '../../common/common.functions.js'

/*** MAIN ***/
export default class Like extends Component {
  constructor(props) {
    super(props)
    const { likes, loggedUserLike } = this.props
    this.state = {
      /* empty and full are used for the Like/Unlike animation - directly
       * checking this.props.loggedUserLike in <Transition/> doesn't work */
      empty: !loggedUserLike,
      full: loggedUserLike,
      likes: likes.length,
      pulse: true
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      empty: !nextProps.loggedUserLike,
      full: nextProps.loggedUserLike,
      likes: nextProps.likes.length
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState !== this.state || nextProps !== this.props) {
      return true
    } else {
      return false
    }
  }
  toggleLikePin() {
    const { img, logged, loggedUser, owner, title } = this.props
    //Only logged users can Like a post
    if (logged) {
      //Quick, client-only response
      this.setState({
        empty: !this.state.empty,
        full: !this.state.full,
        likes: this.state.full ? this.state.likes - 1 : this.state.likes + 1,
        pulse: !this.state.pulse
      })

      const obj = {
        img: img,
        loggedUser: loggedUser,
        owner: owner,
        title: title
      }
      const data = encodeURIComponent(JSON.stringify(obj))
      f('POST', 'api/toggleLikePin/' + data, response => {
        //console.log(response)
      })
    }
  }
  render() {
    const { full, empty, likes, pulse } = this.state

    return (
      <span>
        <Transition animation="pulse" duration={500} visible={pulse}>
          <Icon
            link
            name={full ? 'heart' : 'empty heart'}
            size="large"
            color={full ? 'red' : 'grey'}
            onClick={() => {
              this.toggleLikePin()
            }}
          />
        </Transition>
        {likes}
      </span>
    )
  }
}
