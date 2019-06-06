import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import EventInfo from './EventInfo'
import SubmitEvent from '../forms/SubmitEvent'

const Event = props => {
  const VIEW_INFO = 'VIEW_INFO'
  const VIEW_ADD = 'VIEW_ADD'
  const [view, setView] = useState(VIEW_INFO)

  return (
    <>
      {
        {
          [VIEW_INFO]: (
            <EventInfo
              {...props}
              onAddEvent={() => {
                setView(VIEW_ADD)
              }}
            />
          ),
          [VIEW_ADD]: <SubmitEvent instructions="Please review the info below before adding the event." {...props} />,
        }[view]
      }
    </>
  )
}

Event.propTypes = {
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
}

export default Event
