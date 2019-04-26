import React from 'react'
import PropTypes from 'prop-types'
import { P, Span } from 'styled-system-html'

const EventAddress = props => (
  <P
    color="gray8"
    fontSize={0}
    fontWeight="600"
    mb={2}
    lineHeight="1.4"
    fontStyle="italic"
  >
    <Span>{props.locationName}</Span>
    <br />
    {props.locationStreet}
    <br />
    {props.locationCity}, {props.locationState}
    <br />
  </P>
)

EventAddress.propTypes = {
  locationName: PropTypes.string,
  locationStreet: PropTypes.string,
  locationCity: PropTypes.string,
  locationState: PropTypes.string,
}

export default EventAddress
