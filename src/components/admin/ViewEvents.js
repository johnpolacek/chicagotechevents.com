import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Div, Form, Input } from 'styled-system-html'
import Button from '../Button'
import InputSubmit from '../forms/InputSubmit'
import Event from './Event'

const ViewEvents = props => {

  const MEETUPS_READY = 'MEETUPS_READY'
  const MEETUPS_LOADING = 'MEETUPS_LOADING'
  const MEETUPS_FAIL = 'MEETUPS_FAIL'

  const [meetupSearch, setMeetupSearch] = useState('tech')
  const [meetupSearchStatus, setMeetupSearchStatus] = useState(MEETUPS_READY)
  const [meetupData, setMeetupData] = useState(null)
  const [resultSet, setResultSet] = useState(0)

  const onSearchMeetups = e => {
    e.preventDefault()
    setMeetupSearchStatus(MEETUPS_LOADING)

    try {
      return fetch(`/.netlify/functions/get-meetups/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminCode: props.adminCode,
          search: meetupSearch,
          page: resultSet
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (
            data.message === 'success' &&
            typeof data.response.events === 'object'
          ) {
            setMeetupData(data.response.events.filter((event) => event.venue))
            setMeetupSearchStatus(MEETUPS_READY)
          } else {
            setMeetupSearchStatus(MEETUPS_FAIL)
          }
        })
    } catch (err) {
      setMeetupSearchStatus(MEETUPS_FAIL)
    }
  }

  const onLoadMore = e => {
    setResultSet(resultSet+1)
    onSearchMeetups(e)
  }

  return (
    <>
      <Form onSubmit={onSearchMeetups} pb={5} textAlign="center">
        <Input
          type="text"
          fontSize={0}
          width={160}
          mr={2}
          id="meetupSearch"
          name="meetupSearch"
          value={meetupSearch}
          onChange={e => setMeetupSearch(e.target.value)}
        />
        <InputSubmit
          bg={meetupSearchStatus === MEETUPS_READY ? 'base' : 'gray'}
          fontSize={1}
          py={2}
          value={
            meetupSearchStatus === MEETUPS_LOADING ? 'SEARCHING...' : 'SEARCH'
          }
          disabled={meetupSearchStatus === MEETUPS_LOADING}
        />
      </Form>
      {meetupSearchStatus === MEETUPS_FAIL && (
        <Div color="red">Could not load meetup data</Div>
      )}
      {meetupData && meetupData.length && (
        <>
          <Div id="meetupEvents" py={4}>
            {meetupData.map(event => (
              <Event key={event.id} event={event} />
            ))}
          </Div>
          <Div textAlign="center" pb={5}>
            <Button py={3} px={4} fontSize={3} onClick={onLoadMore} bg="base" color="white">Load More</Button>
          </Div>
        </>
      )}
    </>
  )
}

ViewEvents.propTypes = {
  adminCode: PropTypes.string.isRequired,
}

export default ViewEvents
