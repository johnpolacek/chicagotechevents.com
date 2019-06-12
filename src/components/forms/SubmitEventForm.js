import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, P, Form } from 'styled-system-html'
import 'react-datepicker/dist/react-datepicker.css'
import FormControl from './FormControl'
import FormControlDateTime from './FormControlDateTime'
import InputSubmit from './InputSubmit'

const SubmitEventForm = props => {
  const [eventName, setEventName] = useState(props.eventName || '')
  const [description, setDescription] = useState(props.description || '')
  const [linkURL, setLinkURL] = useState(props.linkURL || '')
  const [cost, setCost] = useState(props.cost || '')
  const [startDate, setStartDate] = useState(props.startDate || null)
  const [startTime, setStartTime] = useState(props.startTime || '5:00pm')
  const [endDate, setEndDate] = useState(props.endDate || null)
  const [endTime, setEndTime] = useState(props.endTime || '7:00pm')
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
    if (!endDate) {
      setEndDate(date)
    }
  }

  const onEndDateChange = date => {
    setEndDate(date)
  }

  return (
    <Form
      width={[1, 360]}
      mx="auto"
      onSubmit={onSubmit}
      style={{ position: 'relative', zIndex: 999 }}
    >
      {props.instructions && (
        <P
          pt={[4, 4, 3]}
          pb={4}
          px={4}
          color="base"
          fontWeight="bold"
          textAlign="center"
        >
          {props.instructions}
        </P>
      )}
      <FormControl
        label="Name of Event"
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
      <Div pt={3} pb={5} mb={4} textAlign="right">
        <InputSubmit id="submitEvent" value="ADD EVENT" />
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
  authorName: PropTypes.string,
  instructions: PropTypes.string,
}

export default SubmitEventForm
