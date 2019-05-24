import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { meetupDataToEventData } from './util'
import AdminEventInfo from './AdminEventInfo'
import SubmitEvent from './SubmitEvent'

const AdminEvent = props => {
  const VIEW_INFO = 'VIEW_INFO'
  const VIEW_ADD = 'VIEW_ADD'
  const [view, setView] = useState(VIEW_INFO)

  const event = props.event
  console.log('event',event)

  return (
    <>
      {
        {
          [VIEW_INFO]: (
            <AdminEventInfo
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

AdminEvent.propTypes = {
  event: PropTypes.object.isRequired,
}

export default AdminEvent
