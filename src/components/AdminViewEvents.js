import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Div, Form, Input } from 'styled-system-html'
import InputSubmit from './InputSubmit'

const AdminViewEvents = props => {

  const MEETUPS_READY = 'MEETUPS_READY'
  const MEETUPS_LOADING = 'MEETUPS_LOADING'
  const MEETUPS_FAIL = 'MEETUPS_FAIL'

  const [meetupSearch, setMeetupSearch] = useState('tech')
  const [meetupSearchStatus, setMeetupSearchStatus] = useState(MEETUPS_LOADING)
  const [meetupData, setMeetupData] = useState(null)

  const onSearchMeetups = e => {
    
    e.preventDefault()
    setMeetupSearchStatus(MEETUPS_LOADING)

    try {
      return fetch(`/.netlify/functions/get-meetups/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({adminCode:props.adminCode, search: meetupSearch}),
      })
        .then(response => response.json())
        .then(data => {
          setMeetupData(data)
          setMeetupSearchStatus(data.message === 'success' ? MEETUPS_READY : MEETUPS_FAIL)
        })
    } catch (err) {
      setMeetupSearchStatus(MEETUPS_FAIL)
    }
  }
  
  return (
    <>
    	<Form onSubmit={onSearchMeetups} pb={5} textAlign="center">
        <Input type="password" fontSize={0} width={160} mr={2} id="adminCode" value={meetupSearch} onChange={e => setMeetupSearch(e.target.value)} />
        <InputSubmit fontSize={1} py={2} value="SEARCH" disabled={meetupSearchStatus === MEETUPS_READY} />
      </Form>
      {
        meetupSearchStatus === MEETUPS_FAIL &&
        <Div color="red">Could not load meetup data</Div>
      }
      {
        meetupData && 
        <Div>Meetup data is loaded: {JSON.stringify(meetupData)}</Div>
      }
    </>
  )
}

AdminViewEvents.propTypes = {
  adminCode: PropTypes.string.isRequired,
  meetupData: PropTypes.object.isRequired,
}

export default AdminViewEvents