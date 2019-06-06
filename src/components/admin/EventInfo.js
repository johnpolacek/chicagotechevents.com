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
        href={props.linkUrl}
        target="_blank"
      >
        view event
      </A>
    </H3>
    <Div
      mb={2}
      fontSize={1}
      height="54px"
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
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onAddEvent: PropTypes.func.isRequired,
}

export default EventInfo
