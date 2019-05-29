import React from 'react'
import { PropTypes } from 'prop-types'
import { Div, H3, Span, A, Button } from 'styled-system-html'

const EventInfo = props => (
  <Div pb={4}>
    <Span fontSize={0}>
      {props.local_date} {props.local_time}
    </Span>
    <H3>
      {props.name}{' '}
      <A
        color="base"
        fontWeight="normal"
        fontSize={0}
        ml={1}
        href={props.link}
        target="_blank"
      >
        view event
      </A>
    </H3>
    <Div
      mb={2}
      fontSize={1}
      height="48px"
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
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  onAddEvent: PropTypes.func.isRequired,
}

export default EventInfo
