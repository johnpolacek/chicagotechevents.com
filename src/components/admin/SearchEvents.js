import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { meetupDataToEventData, eventbriteDataToEventData } from '../util'
import { Div, H3, Form, Input, Span, A } from 'styled-system-html'
import Button from '../ui/Button'
import Toggle from '../ui/Toggle'
import InputSubmit from '../forms/InputSubmit'
import Event from './Event'

const ViewEvents = props => {

  const EVENTS_READY = 'EVENTS_READY'
  const EVENTS_LOADING = 'EVENTS_LOADING'
  const EVENTS_FAIL = 'EVENTS_FAIL'
  const searchModes = ['meetups','eventbrite']

  const [eventSearch, setEventSearch] = useState('tech')
  const [eventSearchStatus, setEventSearchStatus] = useState(EVENTS_READY)
  const [eventData, setEventData] = useState(null)
  const [resultSet, setResultSet] = useState(0)
  const [searchMode, setSearchMode] = useState(searchModes[0])
  const [searchError, setSearchError] = useState('')
  
  const onSearchEvents = e => {
    e.preventDefault()
    setEventData(null)
    setEventSearchStatus(EVENTS_LOADING)

    let fetchUrl = ''
    let fetchArgs = {}

    if (searchMode === 'meetups') {
      const meetupToken = window.location.hash.split('=')[1].split('&')[0]
      fetchUrl = 'https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=-87.6298&page=20&text='+eventSearch+'&radius=5&lat=41.8781'
      fetchArgs = {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Authorization': 'Bearer '+meetupToken,
          'Origin': window.location.href.split('.com')[0]+'.com',
        }
      }
    } else {
      fetchUrl = '/.netlify/functions/get-'+searchMode+'/'
      fetchArgs = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminCode: props.adminCode,
          search: eventSearch,
          page: resultSet
        })
      }
    }

    try {
      return fetch(fetchUrl, fetchArgs)
      .then(response => response.json())
      .then(data => {
        handleSearchResults(data)
      })
    } catch (err) {
      setEventSearchStatus(EVENTS_FAIL)
      setSearchError('Error: '+err)
    }
  }

  const handleSearchResults = data => {
    if (
      typeof data.events === 'object' || typeof data.response.events === 'object'
    ) {
      // both meetup and eventbrite response has events and event.venue
      const eventData = typeof data.events === 'object' ? data.events : typeof data.response.events
      const filterData = eventData.filter(event => event.venue)
      if (searchMode === searchModes[0]) {
        setEventData(filterData.map(event => meetupDataToEventData(event)))
      } else if (searchMode === searchModes[1]) {
        setEventData(filterData.map(event => eventbriteDataToEventData(event)))
      }
      setEventSearchStatus(EVENTS_READY)
    } else {
      setEventSearchStatus(EVENTS_FAIL)
      setSearchError('data: '+JSON.stringify(data))
    }
  }

  const onClickSearchTerm = e => {
    setEventSearch(e.target.innerText)
    onSearchEvents(e)
  }

  const onChangeMode = mode => {
    setEventData(null)
    setSearchMode(mode)
  }

  const onLoadMore = e => {
    setResultSet(resultSet+1)
    onSearchEvents(e)
  }

  return (
    <>
      <H3 textAlign="center" pt={4} pb={2}>Search Events</H3>
      <Div pb={4} textAlign="center" fontWeight="300" fontSize={0}>
        <Toggle label="Search Mode" id="searchMode" colorSelected="red" colorSelectedBg="red3" option1={searchModes[0]} option2={searchModes[1]} label1={searchModes[0].toUpperCase()} label2={searchModes[1].toUpperCase()} selectedOption={searchMode} onToggle={() => {onChangeMode(searchMode === searchModes[0] ? searchModes[1] : searchModes[0])}} />
      </Div>
      <Form onSubmit={onSearchEvents} textAlign="center" pb={4}>
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
      <Div textAlign="center" fontSize={0} pb={5}>
        <Span mx={1}>Search for:</Span>
        <A onClick={onClickSearchTerm} mx={1} href="#">AWS</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">Tech</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">Startup</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">Agile</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">Web</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">VR</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">React</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">JavaScript</A> 
        <A onClick={onClickSearchTerm} mx={1} href="#">Hackathon</A>
        <A onClick={onClickSearchTerm} mx={1} href="#">Serverless</A>
      </Div>
      {eventSearchStatus === EVENTS_FAIL && (
        <>
          <Div color="red">Could not load event data</Div>
          <Div color="red">{searchError}</Div>
        </>
      )}
      {eventData && eventData.length && (
        <>
          <Div id="eventsList" py={4}>
            {eventData.map(event => <Event key={event.id} {...event} /> )}
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
