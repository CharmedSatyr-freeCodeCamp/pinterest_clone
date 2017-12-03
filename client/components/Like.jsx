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
    const { loggedUserLike } = this.props
    this.state = {
      /*empty and full are used for the Like/Unlike animation - directly  *
       *checking this.props.loggedUserLike in <Transition/> doesn't work  */
      empty: !loggedUserLike,
      full: loggedUserLike
    }
  }
  toggleLikePin() {
    //Only logged users can Like a post
    if (this.props.logged) {
      const obj = {
        title: this.props.title,
        img: this.props.img,
        owner: this.props.owner,
        loggedUser: this.props.loggedUser
      }
      const data = encodeURIComponent(JSON.stringify(obj))
      f('POST', 'api/toggleLikePin/' + data, response => {
        //console.log(response)
      })
    }
  }
  render() {
    const { likes, loggedUserLike } = this.props
    const { full, empty } = this.state

    return (
      <span>
        {loggedUserLike ? (
          <Transition animation={'pulse'} duration={500} visible={full}>
            <Icon
              link
              name="heart"
              size="large"
              color="red"
              onClick={() => {
                this.toggleLikePin()
              }}
            />
          </Transition>
        ) : (
          <Transition animation={'pulse'} duration={500} visible={empty}>
            <Icon
              link
              name="empty heart"
              size="large"
              onClick={() => {
                this.toggleLikePin()
              }}
            />
          </Transition>
        )}
        {likes.length}
      </span>
    )
  }
}
