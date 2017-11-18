'use strict'

/*** COMPONENTS ***/
//React
import React, { Component } from 'react'

//Semantic UI
import { Button, Popup } from 'semantic-ui-react'

//App
import NewPin from './NewPin.jsx'

/*** MAIN ***/
const NewPinBtn = ({ show }) => {
  return (
    <Popup
      trigger={<Button color="blue" icon="plus" content="New Pin" />}
      content={<NewPin className="newpin" />}
      on="click"
      position="bottom left"
    />
  )
}

export default NewPinBtn
