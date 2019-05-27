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
              event={event}
              onAddEvent={() => {
                setView(VIEW_ADD)
              }}
            />
          ),
          [VIEW_ADD]: <SubmitEvent instructions="Please review the info below before adding the event." eventData={meetupDataToEventData(event)} />,
        }[view]
      }
    </>
  )
}

Event.propTypes = {
  event: PropTypes.object.isRequired,
}

export default Event
