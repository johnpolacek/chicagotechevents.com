import React, { useState } from 'react'
import SubmitEventForm from './SubmitEventForm'

const saveEvent = async event => {
  // return fetch(`/.netlify/functions/add-event/`, {
  return fetch(`/add-event-api-endpoint-goes-here/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }).then(response => {
    console.log(response)
    return response.json()
  })
}

const SubmitEvent = props => {
  const SUBMIT_READY = 'SUBMIT_READY'
  const SUBMIT_SENDING = 'SUBMIT_SENDING'
  const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
  const SUBMIT_FAIL = 'SUBMIT_FAIL'
  const [submitState, setSubmitState] = useState(SUBMIT_READY)

  const onSubmit = eventData => {
    // console.log(eventData)
    setSubmitState(SUBMIT_SENDING)
    saveEvent(eventData)
      .then(response => {
        setSubmitState(SUBMIT_SUCCESS)
        console.log('response', response)
      })
      .catch(e => {
        setSubmitState(SUBMIT_FAIL)
        console.log('response err', e)
      })
  }
  return (
    <>
      {
        {
          [SUBMIT_READY]: <SubmitEventForm onSubmit={onSubmit} />,
          [SUBMIT_SENDING]: <div>Sending event...</div>,
          [SUBMIT_FAIL]: (
            <div>Oops! There was a problem. Please try again later.</div>
          ),
          [SUBMIT_SUCCESS]: <div>Thanks for sending your event!</div>,
        }[submitState]
      }
    </>
  )
}

export default SubmitEvent
