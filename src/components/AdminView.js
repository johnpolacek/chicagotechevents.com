import React, { useState } from 'react'
import { Div, H2, Form, Input } from 'styled-system-html'
import InputSubmit from './InputSubmit'

const AdminView = props => {
  
  const SIGNIN_READY = 'SIGNIN_READY'
  const SIGNIN_SENDING = 'SIGNIN_SENDING'
  const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
  const SIGNIN_FAIL = 'SIGNIN_FAIL'
  
  const [signedIn, setSignedIn] = useState(SIGNIN_READY)
  const [adminCode, setAdminCode] = useState('')
  
  const onSignIn = e => {
    
    e.preventDefault()

    setSignedIn(SIGNIN_SENDING)

    return fetch(`/.netlify/functions/admin/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({adminCode}),
    })
      .then(response => response.json())
      .then(data => {
        try {
          if (data.message === 'success') {
            setSignedIn(SIGNIN_SUCCESS)
          } else {
            setSignedIn(SIGNIN_FAIL)
          }
        } catch (err) {
          setSignedIn(SIGNIN_FAIL)
        }
      })
  }
  return (
    <>
      <H2 pb={4} fontSize={5} textAlign="center" fontWeight="200" color="base">ADMIN</H2>
      {
        {
          [SIGNIN_READY]: <Form onSubmit={onSignIn} pb={5} textAlign="center">
            <Input type="password" fontSize={0} width={160} mr={2} id="adminCode" value={adminCode} onChange={e => setAdminCode(e.target.value)} />
            <InputSubmit fontSize={1} py={2} value="SIGN IN" />
          </Form>,
          [SIGNIN_SENDING]: <Div textAlign="center" py={5} fontStyle="italic">Sending...</Div>,
          [SIGNIN_FAIL]: <Div textAlign="center" py={5} color="red">Could not access admin.</Div>,
          [SIGNIN_SUCCESS]: <div>success</div>,
        }[signedIn]
      }
    </>
  )
}

export default AdminView
