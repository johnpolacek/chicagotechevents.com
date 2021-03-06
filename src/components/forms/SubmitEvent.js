import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SubmitEventForm from './SubmitEventForm'
import SubmitSending from './SubmitSending'
import SubmitFail from './SubmitFail'
import SubmitSuccess from './SubmitSuccess'

const SubmitEvent = props => {
  const SUBMIT_READY = 'SUBMIT_READY'
  const SUBMIT_SENDING = 'SUBMIT_SENDING'
  const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
  const SUBMIT_FAIL = 'SUBMIT_FAIL'
  const [submitState, setSubmitState] = useState(SUBMIT_READY)
  const [pullRequestUrl, setPullRequestUrl] = useState('')

  const onSubmit = eventData => {
    setSubmitState(SUBMIT_SENDING)
    return fetch(`/.netlify/functions/add-event/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    })
      .then(response => response.json())
      .then(data => {
        try {
          if (data.message === 'success') {
            setSubmitState(SUBMIT_SUCCESS)
            setPullRequestUrl(data.url + '/files')
          } else {
            setSubmitState(SUBMIT_FAIL)
          }
        } catch (err) {
          setSubmitState(SUBMIT_FAIL)
        }
      })
  }
  return (
    <>
      {
        {
          [SUBMIT_READY]: (
            <SubmitEventForm
              {...props}
              onSubmit={onSubmit}
            />
          ),
          [SUBMIT_SENDING]: <SubmitSending />,
          [SUBMIT_FAIL]: <SubmitFail />,
          [SUBMIT_SUCCESS]: <SubmitSuccess url={pullRequestUrl} />,
        }[submitState]
      }
    </>
  )
}

SubmitEvent.propTypes = {
  eventName: PropTypes.string,
  description: PropTypes.string,
  linkURL: PropTypes.string,
  cost: PropTypes.string,
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  locationName: PropTypes.string,
  locationStreet: PropTypes.string,
  locationCity: PropTypes.string,
  authorName: PropTypes.string
}

export default SubmitEvent
