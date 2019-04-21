import React, { useState } from 'react'
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

  const onSubmit = eventData => {
    setSubmitState(SUBMIT_SENDING)
    return fetch(`/.netlify/functions/add-event/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    }).then(response => {
      try {
        if (response.json().message === 'success') {
          setSubmitState(SUBMIT_SUCCESS)
        } else {
          console.log('typeof response', typeof response)
          console.log('typeof response.json', typeof response.json)
          console.log('response.json()', response.json())
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
          [SUBMIT_SENDING]: <SubmitSending />,
          [SUBMIT_FAIL]: <SubmitFail />,
          [SUBMIT_SUCCESS]: <SubmitSuccess />,
        }[submitState]
      }
    </>
  )
}

export default SubmitEvent
