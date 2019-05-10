import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Div, H2 } from 'styled-system-html'
import InputSubmit from './InputSubmit'

const AdminViewEvents = props => {

  console.dir(props.meetupData)
  
  return (
    <>
      <H2 pb={4} fontSize={4} textAlign="center" fontWeight="200" color="base">get events</H2>
    </>
  )
}

AdminViewEvents.propTypes = {
  adminCode: PropTypes.string.isRequired,
  meetupData: PropTypes.object.isRequired,
}

export default AdminViewEvents