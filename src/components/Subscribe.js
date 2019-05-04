import React, { useState } from 'react'
import jsonp from 'jsonp'
import { Div, P, Form, Input } from 'styled-system-html'
import InputSubmit from './InputSubmit'

const SubmitEventForm = props => {
  const READY = 'READY'
  const SENDING = 'SENDING'
  const SUCCESS = 'SUCCESS'
  const ERROR = 'ERROR'

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(READY)

  const onSubmit = e => {
    e.preventDefault()
    setStatus(SENDING)
    if (e.target.checkValidity()) {
      jsonp(
        '//chicagotechevents.us9.list-manage.com/subscribe/post-json?u=a34a4e936e02d56a1d856f609&id=5062422f20&EMAIL=' +
          email,
        {
          param: 'c',
        },
        (err, data) => {
          if (err) {
            console.dir({
              status: 'error',
              message: err,
            })
            setStatus(ERROR)
          } else if (data.result !== 'success') {
            console.dir({
              status: 'error',
              message: data.msg,
            })
            setStatus(ERROR)
          } else {
            console.dir({
              status: 'success',
              message: data.msg,
            })
            setStatus(SUCCESS)
          }
        }
      )
    }
  }

  return (
    <Div
      textAlign="center"
      style={{ position: 'relative', zIndex: 999 }}
      mb={5}
    >
      <P fontSize={[1, 2, 3]} fontWeight={500} mb={2}>
        Subscribe to get weekly event updates
      </P>
      {(status === READY || status === ERROR) && (
        <Form width={[360, 450]} mx="auto" px={3} onSubmit={onSubmit}>
          <Input
            id="subscribeEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            width={[3 / 5, 2 / 3]}
            borderColor="base"
            border="1px solid"
            type="email"
            placeholder="Your email"
          />
          <InputSubmit
            width={[2 / 5, 1 / 3]}
            textAlign="center"
            bg="base"
            fontSize={1}
            mt="-1px"
            py="9px"
            px={0}
            style={{ borderRadius: '0 8px 8px 0' }}
            id="submitSubscribe"
            value="SUBSCRIBE"
          />
        </Form>
      )}
      {status === SENDING && (
        <P pt={2} pb={4} fontSize={1} fontStyle="italic" color="base">
          Subscribing...
        </P>
      )}
      {status === ERROR && (
        <P fontSize={1} pt={4} color="red">
          Sorry, there was an error. Maybe try again?
        </P>
      )}
      {status === SUCCESS && (
        <P py={4} fontSize={2} color="base">
          All set. Thanks for subscribing!
        </P>
      )}
    </Div>
  )
}

export default SubmitEventForm
