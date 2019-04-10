import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-dom/test-utils'
import SubmitEventForm from './SubmitEventForm'

const getTestEventDate = () => {
	const now = new Date();
	if (now.getMonth() == 11) {
	    return new Date(now.getFullYear() + 1, 0, 1);
	} else {
	    return new Date(now.getFullYear(), now.getMonth() + 1, 1);
	}
}

const validFormData = {
	eventName: 'Test Event',
	description: 'This is not a real event. It is just for testing',
	linkURL: 'https://eventbrite.com/test-event',
	cost: 'FREE',
	locationName: '1871 Chicago',
	locationStreet: '222 W Merchandise Mart Plaza #1212',
	authorName: 'Joe Tester',
	authorEmail: 'joe@test.com',
	startDate: getTestEventDate(),
	startTime: '5:00pm',
	endDate: getTestEventDate(),
	endTime: '7:00pm'
}

const enterFormData = (wrapper, formData) => {
	// Enter values
	TestUtils.Simulate.change(wrapper.querySelector('input[name=eventName]'), { target: { value: formData.eventName } })
	TestUtils.Simulate.change(wrapper.querySelector('textarea[name=description]'), { target: { value: formData.description } })
	TestUtils.Simulate.change(wrapper.querySelector('input[name=linkURL]'), { target: { value: formData.linkURL } })
	TestUtils.Simulate.change(wrapper.querySelector('input[name=cost]'), { target: { value: formData.cost } })
	TestUtils.Simulate.change(wrapper.querySelector('input[name=locationName]'), { target: { value: formData.locationName } })
	TestUtils.Simulate.change(wrapper.querySelector('input[name=locationStreet]'), { target: { value: formData.locationStreet } })
	TestUtils.Simulate.change(wrapper.querySelector('input[name=authorName]'), { target: { value: formData.authorName } })
	TestUtils.Simulate.change(wrapper.querySelector('input[name=authorEmail]'), { target: { value: formData.authorEmail } })

	// select date
	TestUtils.Simulate.click(wrapper.querySelector('#datepicker-startDate input'))
	TestUtils.Simulate.click(wrapper.querySelector('button.react-datepicker__navigation--next'))
	TestUtils.Simulate.click(wrapper.querySelector('.react-datepicker__day--001'))
}

const validateFormSubmit = (results, formData) => {
	expect(results.eventName).toEqual(formData.eventName)
	expect(results.description).toEqual(formData.description)
	expect(results.linkURL).toEqual(formData.linkURL)
	expect(results.cost).toEqual(formData.cost)
	expect(results.locationName).toEqual(formData.locationName)
	expect(results.locationStreet).toEqual(formData.locationStreet)
	expect(results.authorName).toEqual(formData.authorName)
	expect(results.authorEmail).toEqual(formData.authorEmail)
	expect(results.startDate).toEqual(formData.startDate)
	expect(results.startTime).toEqual(formData.startTime)
	expect(results.startDate).toEqual(formData.endDate)
	expect(results.endTime).toEqual(formData.endTime)
}

it('submits event data', () => {
	const wrapper = document.createElement('div')
	const onSubmitFn = jest.fn(data => data)
	ReactDOM.render(
		<SubmitEventForm onSubmit={onSubmitFn} />,
		wrapper
	)

	enterFormData(wrapper, validFormData)
	TestUtils.Simulate.submit(wrapper.querySelector('form'))
	
	expect(onSubmitFn).toHaveBeenCalledTimes(1)
	validateFormSubmit(onSubmitFn.mock.results[0].value, validFormData)
	
})

it('requires a valid email', () => {
	const wrapper = document.createElement('div')
	const onSubmitFn = jest.fn(data => data)
	ReactDOM.render(
		<SubmitEventForm onSubmit={onSubmitFn} />,
		wrapper
	)

	const formDataWithInvalidEmail = {...validFormData, authorEmail: 'joe'}

	enterFormData(wrapper, formDataWithInvalidEmail)
	TestUtils.Simulate.submit(wrapper.querySelector('form'))
	
})