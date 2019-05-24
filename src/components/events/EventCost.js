import React from 'react'
import PropTypes from 'prop-types'
import { P } from 'styled-system-html'

const EventCost = props => (
  <P color="gray8" fontWeight="600" fontSize={0} mb={2}>
    Cost: {props.cost}
  </P>
)

EventCost.propTypes = {
  cost: PropTypes.string,
}

export default EventCost
