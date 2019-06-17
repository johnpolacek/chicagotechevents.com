import React from 'react'
import PropTypes from 'prop-types'
import { Div } from 'styled-system-html'

const EventDescription = props => (
  <Div
    fontSize={[1, 2]}
    mb={2}
    dangerouslySetInnerHTML={{
      __html: props.content,
    }}
  />
)

EventDescription.propTypes = {
  content: PropTypes.string,
}

export default EventDescription
