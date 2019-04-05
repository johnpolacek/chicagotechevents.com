import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Div, H2, Form, Label, Input, TextArea, Span } from 'styled-system-html'
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
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
				
				<Label pb={1} display="block" htmlFor="eventName">Name of Event</Label>
				<Input onChange={e => setEventName(e.target.value)} required type="text" width={1} mb={3} name="eventName" value={eventName} />

				<Label pb={1} pt={3} display="block" htmlFor="description">Event Description <Span fontSize={0}>(up to 320 characters)</Span></Label>
				<TextArea onChange={e => setDescription(e.target.value)} required width={1} name="description" value={description} />
				
				<Label pb={1} pt={3} display="block" htmlFor="linkURL">Event Website <br/><Span fontSize={0}>(e.g. http://www.meetup.com/Chicago-Open-Coffee)</Span></Label>
				<Input onChange={e => setLinkURL(e.target.value)} required type="text" width={1} mb={3} name="linkURL" value={linkURL} />
				
				<Label pb={1} pt={3} display="block" htmlFor="cost">Cost <Span fontSize={0}>(if none, enter FREE)</Span></Label>
				<Input onChange={e => setCost(e.target.value)} required type="text" width={1} mb={3} name="cost" value={cost} />
				
				<Label pb={1} pt={3} display="block" htmlFor="startDate">Start Date</Label>
				<Div width={1} display="flex" flexWrap="wrap" mb={3}>
					<Div width={1/2}>
						<DatePicker selected={startDate} onChange={onStartDateChange}/>
					</Div>
					<Div width={[1,1/2]} pl={[0,2]}>
						<Timepicker onChange={(time) => {setStartTime(time)}} id="startTime" defaultTime={startTime} />
					</Div>
				</Div>
				
				<Label pb={1} pt={3} display="block" htmlFor="endDate">End Date</Label>
				<Div width={1} display="flex" flexWrap="wrap" mb={3}>
					<Div width={1/2}>
						<DatePicker selected={endDate} onChange={onEndDateChange}/>
					</Div>
					<Div width={[1,1/2]} pl={[0,2]}>
						<Timepicker onChange={(time) => {setEndTime(time)}} id="endTime" defaultTime={endTime} />
					</Div>
				</Div>
				
				<Label pb={1} pt={3} display="block" htmlFor="locationName">Location Name <Span fontSize={0}>(No Webinar/Online events)</Span></Label>
				<Input onChange={e => setLocationName(e.target.value)} required type="text" width={1} mb={3} name="locationName" value={locationName} />
				
				<Label pb={1} pt={3} display="block" htmlFor="locationStreet">Street Address <Span fontSize={0}>(short street name, e.g. 120 N State)</Span></Label>
				<Input onChange={e => setLocationStreet(e.target.value)} required type="text" width={1} mb={3} name="locationStreet" value={locationStreet} />
				
				<Label pb={1} pt={3} display="block" htmlFor="locationCity">City <Span fontSize={0}>(must be in Chicagoland area)</Span></Label>
				<Input onChange={e => setLocationCity(e.target.value)} required type="text" width={1} mb={3} name="locationStreet" value={locationCity} />

				<Label pb={1} pt={3} display="block" htmlFor="authorName">Your Name</Label>
				<Input onChange={e => setAuthorName(e.target.value)} required type="text" width={1} mb={3} name="authorName" value={authorName} />

				<Label pb={1} pt={3} display="block" htmlFor="authorName">Your Email</Label>
				<Input onChange={e => setAuthorEmail(e.target.value)} required type="text" width={1} mb={3} name="authorEmail" value={authorEmail} />
				
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
