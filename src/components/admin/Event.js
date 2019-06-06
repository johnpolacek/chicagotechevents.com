import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { meetupDataToEventData } from '../util'
import EventInfo from './EventInfo'
import SubmitEvent from '../forms/SubmitEvent'

const Event = props => {
  const VIEW_INFO = 'VIEW_INFO'
  const VIEW_ADD = 'VIEW_ADD'
  const [view, setView] = useState(VIEW_INFO)

  const event = props.event

  return (
    <>
      {
        {
          [VIEW_INFO]: (
            <EventInfo
              startDate={props.startDate}
              startTime={props.startTime}
              eventName={props.eventName}
              linkUrl={props.linkUrl}
              description={props.description}
              onAddEvent={() => {
                setView(VIEW_ADD)
              }}
            />
          ),
          [VIEW_ADD]: <SubmitEvent instructions="Please review the info below before adding the event." eventData={event} />,
        }[view]
      }
    </>
  )
}

Event.propTypes = {
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Event
