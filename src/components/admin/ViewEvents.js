import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Div, Form, Input } from 'styled-system-html'
import Button from '../ui/Button'
import InputSubmit from '../forms/InputSubmit'
import Event from './Event'

const ViewEvents = props => {

  const EVENTS_READY = 'EVENTS_READY'
  const EVENTS_LOADING = 'EVENTS_LOADING'
  const EVENTS_FAIL = 'EVENTS_FAIL'

  const [eventSearch, setEventSearch] = useState('tech')
  const [eventSearchStatus, setEventSearchStatus] = useState(EVENTS_READY)
  const [eventData, setEventData] = useState(null)
  const [resultSet, setResultSet] = useState(0)

  const onSearchEvents = e => {
    e.preventDefault()
    setEventSearchStatus(EVENTS_LOADING)

    try {
      return fetch(`/.netlify/functions/get-meetups/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminCode: props.adminCode,
          search: eventSearch,
          page: resultSet
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (
            data.message === 'success' &&
            typeof data.response.events === 'object'
          ) {
            setEventData(data.response.events.filter((event) => event.venue))
            setEventSearchStatus(EVENTS_READY)
          } else {
            setEventSearchStatus(EVENTS_FAIL)
          }
        })
    } catch (err) {
      setEventSearchStatus(EVENTS_FAIL)
    }
  }

  const onLoadMore = e => {
    setResultSet(resultSet+1)
    onSearchEvents(e)
  }

  return (
    <>
      <Form onSubmit={onSearchEvents} pb={5} textAlign="center">
        <Input
          type="text"
          fontSize={0}
          width={160}
          mr={2}
          id="eventSearch"
          name="eventSearch"
          value={eventSearch}
          onChange={e => setEventSearch(e.target.value)}
        />
        <InputSubmit
          bg={eventSearchStatus === EVENTS_READY ? 'base' : 'gray'}
          fontSize={1}
          py={2}
          value={
            eventSearchStatus === EVENTS_LOADING ? 'SEARCHING...' : 'SEARCH'
          }
          disabled={eventSearchStatus === EVENTS_LOADING}
        />
      </Form>
      {eventSearchStatus === EVENTS_FAIL && (
        <Div color="red">Could not load event data</Div>
      )}
      {eventData && eventData.length && (
        <>
          <Div id="meetupEvents" py={4}>
            {eventData.map(event => (
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
