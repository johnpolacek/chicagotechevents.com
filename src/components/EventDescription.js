import React from 'react'
import PropTypes from 'prop-types'
import { P } from 'styled-system-html'

const EventDescription = props => (
  <P
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
