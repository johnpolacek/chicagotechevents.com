import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Div, Form, Input, H3, Span, A, Button } from 'styled-system-html'
import InputSubmit from './InputSubmit'

const AdminViewEvents = props => {

  // const exampleMeetupData = [{
  //   "created":1548560931000,
  //   "duration":10800000,
  //   "fee":{
  //     "accepts":"wepay",
  //     "amount":30,
  //     "currency":"USD",
  //     "description":"",
  //     "label":"Price",
  //     "required":true
  //   },
  //   "id":"258430852",
  //   "name":"The WTF Lounge",
  //   "date_in_series_pattern":false,"status":"upcoming",
  //   "time":1559773800000,
  //   "local_date":"2019-06-05",
  //   "local_time":"17:30",
  //   "updated":1549579168000,
  //   "utc_offset":-18000000,
  //   "waitlist_count":0,
  //   "yes_rsvp_count":1,
  //   "venue": {
  //     "id":26119551,
  //     "name":"Merchandise Mart",
  //     "lat":41.88897705078125,
  //     "lon":-87.63397979736328,
  //     "repinned":true,
  //     "city":"Chicago",
  //     "country":"us",
  //     "localized_country_name":"USA",
  //     "zip":"60654",
  //     "state":"IL"
  //   },
  //   "group":{"created":1456493474000,"name":"Women Tech Founders (WTF) of Chicago",
  //   "id":19628554,"join_mode":"open",
  //   "lat":41.88999938964844,"lon":-87.63999938964844,"urlname":"Women-Tech-Founders-WTF-of-Chicago",
  //   "who":"Women Tech Founders (WTF)",
  //   "localized_location":"Chicago, IL",
  //   "state":"IL",
  //   "country":"us",
  //   "region":"en_US",
  //   "timezone":"US/Central"},"link":"https://www.meetup.com/Women-Tech-Founders-WTF-of-Chicago/events/258430852/",
  //   "description":"<p>Join today and tomorrow's innovators, tech entrepreneurs, leaders, investors, and changemakers. Be a part of our first Lounge Night, connect with the community, and rise with us.</p> <p>Member discounts: WomenTechFounders.com/Join/</p> <p>Agenda:<br/>5:30 pm Networking<br/>6:00 pm Welcome, introductions &amp; announcements<br/>6:30 pm Interview with award-winning founder<br/>7:00 pm Q &amp; A<br/>7:15 pm Breakouts<br/>8:00 pm Close</p> ",
  //   "how_to_find_us":"www.WomenTechFounders.com",
  //   "visibility":"public"
  // }]

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
          if (data.message === 'success' && typeof data.response.events === 'object') {
            setMeetupData(data.response.events)
            setMeetupSearchStatus(MEETUPS_READY)
          } else {
            setMeetupSearchStatus(MEETUPS_FAIL)
          }
        })
    } catch (err) {
      setMeetupSearchStatus(MEETUPS_FAIL)
    }
  }
  
  return (
    <>
    	<Form onSubmit={onSearchMeetups} pb={5} textAlign="center">
        <Input type="text" fontSize={0} width={160} mr={2} id="adminCode" value={meetupSearch} onChange={e => setMeetupSearch(e.target.value)} />
        <InputSubmit bg={meetupSearchStatus === MEETUPS_READY ? 'base' : 'gray'} fontSize={1} py={2} value={meetupSearchStatus === MEETUPS_LOADING ? 'SEARCHING...' : 'SEARCH'} disabled={meetupSearchStatus === MEETUPS_READY} />
      </Form>
      {
        meetupSearchStatus === MEETUPS_FAIL &&
        <Div color="red">Could not load meetup data</Div>
      }
      {
        meetupData && meetupData.length && 
        <Div py={4}>
          {
            meetupData.map(event => (
              <Div>
                <Span fontSize={0}>{event.local_date} {event.local_time}</Span>
                <H3>{event.name} <A color="base" fontWeight="normal" fontSize={0} ml={1} href={event.link} target="_blank">view event</A></H3>
                <Div mb={2} fontSize={1} height="48px" overflow="hidden" dangerouslySetInnerHTML={{ __html: event.description }} />
                <Button px={3} borderRadius="6px" fontSize={0} bg="cyan" color="white">Add Event</Button>
              </Div>
            ))
          }
        </Div>
      }
    </>
  )
}

AdminViewEvents.propTypes = {
  adminCode: PropTypes.string.isRequired,
}

export default AdminViewEvents