import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { meetupDataToEventData } from './util'
import AdminMeetupEventInfo from './AdminMeetupEventInfo'
import SubmitEvent from './SubmitEvent'

const AdminMeetupEvent = props => {
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
            <AdminMeetupEventInfo
              event={event}
              onAddEvent={() => {
                setView(VIEW_ADD)
              }}
            />
          ),
          [VIEW_ADD]: <SubmitEvent eventData={meetupDataToEventData(event)} />,
        }[view]
      }
    </>
  )
}

AdminMeetupEvent.propTypes = {
  event: PropTypes.object.isRequired,
}

export default AdminMeetupEvent
