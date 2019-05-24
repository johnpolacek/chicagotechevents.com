import React from 'react'
import { PropTypes } from 'prop-types'
import { Div, H3, Span, A, Button } from 'styled-system-html'

const AdminEventInfo = props => (
  <Div pb={4}>
    <Span fontSize={0}>
      {props.event.local_date} {props.event.local_time}
    </Span>
    <H3>
      {props.event.name}{' '}
      <A
        color="base"
        fontWeight="normal"
        fontSize={0}
        ml={1}
        href={props.event.link}
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
      dangerouslySetInnerHTML={{ __html: props.event.description }}
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

AdminEventInfo.propTypes = {
  event: PropTypes.object.isRequired,
  onAddEvent: PropTypes.func.isRequired,
}

export default AdminEventInfo
