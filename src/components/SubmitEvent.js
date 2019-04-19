import React, { useState } from 'react'
import SubmitEventForm from './SubmitEventForm'

const SubmitEvent = props => {
  const SUBMIT_READY = 'SUBMIT_READY'
  const SUBMIT_SENDING = 'SUBMIT_SENDING'
  const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
  const SUBMIT_FAIL = 'SUBMIT_FAIL'
  const [submitState, setSubmitState] = useState(SUBMIT_READY)

  const onSubmit = eventData => {
    setSubmitState(SUBMIT_SENDING)
    // return fetch(`/.netlify/functions/add-event/`, {
    return fetch(`/add-event-api-endpoint-goes-here/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    }).then(response => {
      try {
        if (response.json().message === 'success') {
          setSubmitState(SUBMIT_SUCCESS)
        } else {
          setSubmitState(SUBMIT_FAIL)
        }
      } catch (err) {
        setSubmitState(SUBMIT_FAIL)
        console.log(err)
      }
    })
  }
  return (
    <>
      {
        {
          [SUBMIT_READY]: <SubmitEventForm onSubmit={onSubmit} />,
          [SUBMIT_SENDING]: <div>Sending event...</div>,
          [SUBMIT_FAIL]: <div>Oops! There was a problem.</div>,
          [SUBMIT_SUCCESS]: <div>Thanks for sending your event!</div>,
        }[submitState]
      }
    </>
  )
}

export default SubmitEvent
