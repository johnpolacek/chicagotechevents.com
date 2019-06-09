import React from 'react'
import { PropTypes } from 'prop-types'
import { Div, H3, Span, A, Button } from 'styled-system-html'

const EventInfo = props => (
  <Div pb={4}>
    <Span fontSize={0}>
      {new Date(props.startDate).toDateString()} {props.startTime}
    </Span>
    <H3>
      {props.eventName}{' '}
      <A
        color="base"
        fontWeight="normal"
        fontSize={0}
        ml={1}
        style={{whiteSpace: 'nowrap'}}
        href={props.linkURL}
        target="_blank"
      >
        view event
      </A>
    </H3>
    <Div
      mb={2}
      fontSize={1}
      maxHeight="54px"
      overflow="hidden"
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
    <Button
      onClick={props.onAddEvent}
      px={3}
      borderRadius="6px"
      fontSize={0}
      bg="cyan"
      color="white"
    >
      Add Event
    </Button>
  </Div>
)

EventInfo.propTypes = {
  eventName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  locationStreet: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  onAddEvent: PropTypes.func.isRequired,
}

export default EventInfo
