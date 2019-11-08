import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, Form, H4, P } from 'styled-system-html'
import 'react-datepicker/dist/react-datepicker.css'
import FormControl from './FormControl'
import FormControlDateTime from './FormControlDateTime'
import InputSubmit from './InputSubmit'
import Event from '../events/Event'

const SubmitEventForm = props => {
  const [eventName, setEventName] = useState(props.eventName || '')
  const [description, setDescription] = useState(props.description || '')
  const [linkURL, setLinkURL] = useState(props.linkURL || '')
  const [cost, setCost] = useState(props.cost || '')
  const [startDate, setStartDate] = useState(props.startDate || new Date(new Date().setDate(new Date().getDate()+1)))
  const [startTime, setStartTime] = useState(props.startTime || '6:00pm')
  const [endDate, setEndDate] = useState(props.endDate || new Date(new Date().setDate(new Date().getDate()+1)))
  const [endTime, setEndTime] = useState(props.endTime || '8:00pm')
  const [locationName, setLocationName] = useState(props.locationName || '')
  const [locationStreet, setLocationStreet] = useState(
    props.locationStreet || ''
  )
  const [locationCity, setLocationCity] = useState(
    props.locationCity || 'Chicago'
  )
  const [authorName, setAuthorName] = useState(props.authorName || '')

  const onSubmit = e => {
    e.preventDefault()
    if (e.target.checkValidity() && validateDates()) {
      props.onSubmit({
        eventName,
        description,
        linkURL,
        cost,
        startDate,
        startTime,
        endDate,
        endTime,
        locationName,
        locationStreet,
        locationCity,
        authorName,
      })
    }
  }

  const validateDates = () => {
    var isNotMissingValues =
      [startDate, startTime, endDate, endTime].filter(val => val && val !== '')
        .length === 4
    var isValidStartDate = new Date(startDate).toString !== 'Invalid Date'
    var isValidEndDate = new Date(endDate).toString !== 'Invalid Date'
    return isNotMissingValues && isValidStartDate && isValidEndDate
  }

  const onStartDateChange = date => {
    setStartDate(date)
    if (new Date(date).getTime() > new Date(endDate).getTime()) {
      setEndDate(date)
    }
  }

  const onEndDateChange = date => {
    setEndDate(date)
  }

  const formatDate = d => {
    const dateToFormat = new Date(d)
    return dateToFormat.toLocaleString('default', { month: 'long' }) + ' ' + dateToFormat.getDate() + ', ' + dateToFormat.getFullYear()
  }

  return (
    <Form
      width={1}
      px={[3,4,5]}
      onSubmit={onSubmit}
      style={{ position: 'relative', zIndex: 999 }}
    >
      <Div display={['block','block','flex']} flexWrap="wrap" pt={4} px={4} bg="white" width={[1,480,1,1,1,1200]} mx="auto">
        <Div width={[1,1,1/3]}>
          <FormControl
            label="Event Title"
            type="text"
            id="eventName"
            value={eventName}
            setValue={setEventName}
          />
          <FormControl
            label="Event Description"
            type="textarea"
            id="description"
            value={description}
            setValue={setDescription}
            labelAddendum="(up to 320 characters)"
          />
          <FormControl
            label="Event Website"
            type="text"
            id="linkURL"
            value={linkURL}
            setValue={setLinkURL}
            labelAddendum="(e.g.&nbsp;http://www.meetup.com/Chicago-Open-Coffee)"
          />
          <FormControl
            label="Cost"
            type="text"
            id="cost"
            value={cost}
            setValue={setCost}
            labelAddendum="(if none, enter FREE)"
          />
          <FormControlDateTime
            required={true}
            label="Start Date"
            id="startDate"
            onDateChange={onStartDateChange}
            dateValue={new Date(startDate)}
            onTimeChange={time => {
              console.log('onTimeChange', time)
              setStartTime(time)
            }}
            timeValue={startTime}
          />
          <FormControlDateTime
            required={true}
            label="End Date"
            id="endDate"
            onDateChange={onEndDateChange}
            dateValue={new Date(endDate)}
            onTimeChange={time => {
              setEndTime(time)
            }}
            timeValue={endTime}
          />
          <FormControl
            label="Location Name"
            type="text"
            id="locationName"
            value={locationName}
            setValue={setLocationName}
            labelAddendum="(No Webinar/Online events)"
          />
          <FormControl
            label="Street Address"
            type="text"
            id="locationStreet"
            value={locationStreet}
            setValue={setLocationStreet}
            labelAddendum="(short street name, e.g. 120 N State)"
          />
          <FormControl
            label="City"
            type="text"
            id="locationCity"
            value={locationCity}
            setValue={setLocationCity}
            labelAddendum="(must be in Chicagoland area)"
          />
          <FormControl
            label="Your Name"
            type="text"
            id="authorName"
            value={authorName}
            setValue={setAuthorName}
          />
        </Div>
      <Div width={[1,1,2/3]} pl={[0,0,4,5]} pr={[0,0,4]}>
        <H4 fontSize={0} fontStyle="italic" color="gray" pb={2}>Event Listing Preview</H4>
        <Div pt={3} px={3} border="1px solid" borderColor="#ddd">
          <Event
            url='url' 
            title={eventName || 'Event Title'} 
            startDate={formatDate(startDate)}
            startTime={startTime} 
            endDate={formatDate(endDate)}
            endTime={endTime} 
            content={description}
            locationName={locationName || 'Location Name'}
            locationStreet={locationStreet || 'Street'}
            locationCity={locationCity || 'City'}
            locationState={'IL'}
            cost={cost || 'FREE'} 
            eventUrl={linkURL || 'Your event website'} 
            isLast={true}
          />
        </Div>
        <P fontWeight="bold" color="red" fontStyle="italic" pt={2}>Please make sure your event date, time and other info is correct</P>
      </Div>
      <Div width={[1,1,1/3]} pt={3} pb={5} mb={4} textAlign="right">
        <InputSubmit id="submitEvent" value="ADD EVENT" />
      </Div>
    </Div>
  </Form>
  )
}

SubmitEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  eventName: PropTypes.string,
  description: PropTypes.string,
  linkURL: PropTypes.string,
  cost: PropTypes.string,
  startDate: PropTypes.string,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  locationName: PropTypes.string,
  locationStreet: PropTypes.string,
  locationCity: PropTypes.string,
  authorName: PropTypes.string
}

export default SubmitEventForm
