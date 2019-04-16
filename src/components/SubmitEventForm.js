import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, H2, Form } from 'styled-system-html'
import 'react-datepicker/dist/react-datepicker.css'
import FormControl from './FormControl'
import FormControlDateTime from './FormControlDateTime'
import InputSubmit from './InputSubmit'


const SubmitEventForm = (props) => {

	const [eventName, setEventName] = useState('')
	const [description, setDescription] = useState('')
	const [linkURL, setLinkURL] = useState('')
	const [cost, setCost] = useState('')
	const [startDate, setStartDate] = useState(null)
	const [startTime, setStartTime] = useState('5:00pm')
	const [endDate, setEndDate] = useState(null)
	const [endTime, setEndTime] = useState('7:00pm')
	const [locationName, setLocationName] = useState('')
	const [locationStreet, setLocationStreet] = useState('')
	const [locationCity, setLocationCity] = useState('Chicago')
	const [authorName, setAuthorName] = useState('')
	const [authorEmail, setAuthorEmail] = useState('')

	const onSubmit = (e) => {
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
				authorEmail
			})
		} else {
			return 'Form not valid'
		}
	}

	const validateDates = () => {
		var isNotMissingValues = [startDate,startTime,endDate,endTime].filter((val) => val && val !== '').length === 4
		var isValidStartDate = (new Date(startDate).toString !== 'Invalid Date')
		var isValidEndDate = (new Date(endDate).toString !== 'Invalid Date')
		return isNotMissingValues && isValidStartDate && isValidEndDate
	}

	const onStartDateChange = (date) => {
		setStartDate(date)
		if (!endDate) {
			setEndDate(date)
		}
	}

	const onEndDateChange = (date) => {
		setEndDate(date)
	}

	return (
		<>
			<H2 fontSize={4} pb={4} fontWeight="bold" textAlign="center">Submit an Event</H2>

			<Form width={[1,360]} mx="auto" onSubmit={onSubmit}>
				
				<FormControl label="Name of Event" type="text" id="eventName" value={eventName} setValue={setEventName} />
				<FormControl label="Event Description" type="textarea" id="description" value={description} setValue={setDescription} labelAddendum="(up to 320 characters)" />
				<FormControl label="Event Website" type="text" id="linkURL" value={linkURL} setValue={setLinkURL} labelAddendum="(e.g.&nbsp;http://www.meetup.com/Chicago-Open-Coffee)" />
				<FormControl label="Cost" type="text" id="cost" value={cost} setValue={setCost} labelAddendum="(if none, enter FREE)" />
				
				<FormControlDateTime required={true} label="Start Date" id="startDate" onDateChange={onStartDateChange} dateValue={startDate} onTimeChange={(time) => {setStartTime(time)}} timeValue={startTime} />
				<FormControlDateTime required={true} label="End Date" id="endDate" onDateChange={onEndDateChange} dateValue={endDate} onTimeChange={(time) => {setEndTime(time)}} timeValue={endTime} />
				
				<FormControl label="Location Name" type="text" id="locationName" value={locationName} setValue={setLocationName} labelAddendum="(No Webinar/Online events)" />
				<FormControl label="Street Address" type="text" id="locationStreet" value={locationStreet} setValue={setLocationStreet} labelAddendum="(short street name, e.g. 120 N State)" />
				<FormControl label="City" type="text" id="locationCity" value={locationCity} setValue={setLocationCity} labelAddendum="(must be in Chicagoland area)" />
				<FormControl label="Your Name" type="text" id="authorName" value={authorName} setValue={setAuthorName} />
				<FormControl label="Your Email" type="email" id="authorEmail" value={authorEmail} setValue={setAuthorEmail} />
				
				<Div pt={4} pb={5} textAlign="right">
					<InputSubmit id="submitEvent" value="Submit Event" />
				</Div>

			</Form>
		</>
	)
}

SubmitEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SubmitEventForm
