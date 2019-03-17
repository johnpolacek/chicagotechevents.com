import React from 'react'
import InputSubmit from './InputSubmit'
import { Div, Form, Label, Input } from 'styled-system-html'

const onSubmit = (e) => {
	e.preventDefault()

	const data = new FormData(e.target)
    const eventName = data.get('eventName')
	console.log('onSubmit '+eventName)
	saveEvent(data).then((response) => {
        console.log('response', response)
    }).catch((e) => {
        console.log('response err', e)
    })
}

const SubmitEventForm = (props) => (
	<Form onSubmit={onSubmit}>
		<Label display="block" htmlFor="eventName">Name of Event</Label>
		<Input name="eventName" />
		<Div>
			<InputSubmit value="Submit Event" />
		</Div>
	</Form>
)

async function saveEvent(event) {
	console.log('send event', event)
	return fetch(`/.netlify/functions/add-event/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(event),
	}).then(response => {
		return response.json()
	})
}

export default SubmitEventForm
