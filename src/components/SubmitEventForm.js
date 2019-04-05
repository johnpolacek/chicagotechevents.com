import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, H2, Form, Label, Input, TextArea, Span } from 'styled-system-html'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import FormControl from './FormControl'
import Timepicker from './Timepicker'
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
	}

	const onStartDateChange = (date) => {
		setStartDate(date)
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

				<FormControl label="Start Date" type="custom" id="startDate">
					<Div width={1} display="flex" flexWrap="wrap" mb={3}>
						<Div width={1/2}>
							<DatePicker selected={startDate} onChange={onStartDateChange}/>
						</Div>
						<Div width={[1,1/2]} pl={[0,2]}>
							<Timepicker onChange={(time) => {setStartTime(time)}} id="startTime" defaultTime={startTime} />
						</Div>
					</Div>
				</FormControl>

				<FormControl label="End Date" type="custom" id="endDate">
					<Div width={1} display="flex" flexWrap="wrap" mb={3}>
						<Div width={1/2}>
							<DatePicker selected={endDate} onChange={onEndDateChange}/>
						</Div>
						<Div width={[1,1/2]} pl={[0,2]}>
							<Timepicker onChange={(time) => {setEndTime(time)}} id="endTime" defaultTime={endTime} />
						</Div>
					</Div>
				</FormControl>
				
				<FormControl label="Location Name" type="text" id="locationName" value={locationName} setValue={setLocationName} labelAddendum="(No Webinar/Online events)" />
				
				<FormControl label="Street Address" type="text" id="locationStreet" value={locationStreet} setValue={setLocationStreet} labelAddendum="(short street name, e.g. 120 N State)" />
				
				<FormControl label="City" type="text" id="locationCity" value={locationCity} setValue={setLocationCity} labelAddendum="(must be in Chicagoland area)" />

				<FormControl label="Your Name" type="text" id="authorName" value={authorName} setValue={setAuthorName} />
				
				<FormControl label="Your Email" type="email" id="authorEmail" value={authorEmail} setValue={setAuthorEmail} />
				
				<Div pt={4} pb={5} textAlign="right">
					<InputSubmit value="Submit Event" />
				</Div>

			</Form>
		</>
	)
}

SubmitEventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default SubmitEventForm
