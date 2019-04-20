
# ChicagoTechEvents.com Build Log

*A step-by-step documentation of building chicagotechevents.com*

----

**WIP**
- Write Netlify Functions section
- Test for Netlify Function
- Not a Robot

----

## Part 1: Getting Started

Use the Gatsby CLI to create a new events list from the [Gatsby Events List Starter](https://github.com/johnpolacek/gatsby-starter-events-list).

~~~~
gatsby new my-events-list https://github.com/johnpolacek/gatsby-starter-events-list
cd my-events-list
npm run dev
~~~~

This basic events list is nice, but we want to be able to accept submissions. 

There is a nice example of doing this with Google Forms in the [Gatsby Event Calendar Starter](https://www.gatsbyjs.org/starters/EmaSuriano/gatsby-starter-event-calendar/). In that example, people submit events via the Google Form and the site updates as those events are added or updated.

In our case, we don’t want any old spammy event to get listed so let’s set up a review process where users can submit events, an admin can reject or approve. 

Reject or approve, what does that sound like? I’ll give you a hint—our starter will generate a new build every time one of these gets merged.

We are going to deploy and host our site on [Netlify](https://www.netlify.com/) and with [Netlify Functions](https://www.netlify.com/docs/functions/), we can create a Lambda endpoint that can issue a pull request to our project’s Github repository.

First, sign up for a Netlify Account and link it to your Github account. Add a new Github repo for the events list, and create a new Netlify site from the repo.

Add a new route with a basic page for submitting new events.

*/src/pages/submit.js*

~~~~
import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SubmitEventForm from '../components/SubmitEventForm'

class Submit extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    return (
      <Layout location={this.props.location} title={siteTitle} description={siteDescription}>
        <SEO
          title="Submit New Event"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <p>A submit event form will go here.</p>
      </Layout>
    )
  }
}

export default Submit

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
~~~~

Next, we add a link to our new page by adding it to the `Header` component that was part of the original [Gatsby Events List Starter](https://github.com/johnpolacek/gatsby-starter-events-list).

*src/components/Header.js*

~~~~
import React from 'react'
import { Link } from 'gatsby'
import { Header, H1, H2, Span } from 'styled-system-html'

export default (props) => (
  <>{
    props.path === '/' ? (
      <Header textAlign="center" pb={4} mb={2}>
        <H1 pb={2} mb={2}>{props.title}</H1>
        <H2 fontSize={2} fontWeight="normal" mb={4}>{props.description}</H2>
        <Link style={{textDecoration:'none'}} to={`/submit`}><Span bg="cyan" color="white" px={3} py={2} borderRadius="4px">Submit an Event</Span></Link>
      </Header>
    ) : (
      <Header borderBottom="solid 2px" borderColor="gray2" textAlign="center" pt={2} pb={4} mb={4} fontSize={1}>
        <H1 fontSize={2} pb={2}>{props.title}</H1>
        <Link to={`/`}>view all events</Link>
      </Header>
    )
  }</>
)
~~~~

Our updated `Header` component will render a link to the `/submit` route if it is on the top level path. Note that we use a Gatsby `<Link>` component here to take advantage of its [preloading performance feature](https://www.gatsbyjs.org/docs/gatsby-link/).

----

## Part 2: Add a Form

There isn’t too much going on with this submit page yet. We will now create a `SubmitEventForm` component with all the fields necessary for generating a new markdown file that will be submitted in a pull request to be reviewed to get added to the site.

Let’s add our yet-to-be-created form component onto the submit page with an `onSubmit` function that will console log the data being submitted.

*/src/pages/submit.js*

~~~~
  ...
  <SubmitEventForm onSubmit={(data) => {console.log(data)}} />
</Layout>

~~~~

In our new `SubmitEventForm` component we will create React Hooks for all the data we are collecting from the form. To collect the date and time data, we are using [React Datepicker](https://reactdatepicker.com) and a custom [Timepicker component](https://github.com/johnpolacek/chicagotechevents.com/blob/master/src/components/Timepicker.js).

First, let’s make some components for the form controls.

A `FormControl` component will be our base component for our form inputs and labels. We can make sure that all our controls have the same layout and share the same properties.

*src/components/FormControl.js*

~~~~
import React from 'react'
import PropTypes from 'prop-types'
import { Div, Label, Input, TextArea, Span } from 'styled-system-html'

const getFormControl = (type) => {
	if (type === 'email') {
		return 'TEXT'
	} else {
		return type.toUpperCase()
	}
}

const FormControl = (props) => (
	<Div pb={2}>
		<Label pb={1} display="block" htmlFor={props.id}>{props.label}{props.labelAddendum ? <Span fontSize={0} pl={1}> {props.labelAddendum}</Span> : ''}</Label>
		<>
          {{
            TEXT: <Input type={props.type} name={props.id} onChange={e => props.setValue(e.target.value)} required width={1} mb={3} value={props.value} />,
            TEXTAREA: <TextArea name={props.id} onChange={e => props.setValue(e.target.value)} required width={1} mb={3} value={props.value} />,
            CUSTOM: <>{props.children}</>
          }[getFormControl(props.type)] }
        </>
		
	</Div>
)

FormControl.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelAddendum: PropTypes.string,
  value: PropTypes.string,
  setValue: PropTypes.func
}

export default FormControl
~~~~

We have a special form control component for capturing event dates and times.

*src/components/FormControlDateTime.js*

~~~~
import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import Timepicker from './Timepicker'
import { Div } from 'styled-system-html'
import FormControl from './FormControl.js'

const FormControlDateTime = (props) => (
	<FormControl label={props.label} type="custom" id={props.id} labelAddendum={props.labelAddendum}>
		<Div width={1} display="flex" flexWrap="wrap" mb={3}>
			<Div width={1/2}>
				<DatePicker selected={props.dateValue} onChange={props.onDateChange}/>
			</Div>
			<Div width={[1,1/2]} pl={[0,2]}>
				<Timepicker id={props.id} defaultTime={props.timeValue} onChange={props.onTimeChange} />
			</Div>
		</Div>
	</FormControl>
)

FormControlDateTime.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  labelAddendum: PropTypes.string,
  dateValue: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  timeValue: PropTypes.string,
  onTimeChange: PropTypes.func.isRequired
}

export default FormControlDateTime
~~~~

Now we can use these components to build our submit event form.

*src/components/SubmitEventForm.js*

~~~~
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

~~~~

Now we can visit our submit event page and test out our form and see the data logged to the console.

---- 

## Part 3: Testing

Before proceeding any further, we can add tests to make sure that that when people submit their events everything works as expected.

We will be using [Cypress](https://cypress.io) to run our tests. Why? Because it is awesome. Let’s go.

~~~~
npm i --save-dev cypress
~~~~

Let’s add a command to `package.json` to open Cypress

*package.json*
~~~~
"scripts": {
  ...
  "cypress:open": "cypress open",
  ...
}
~~~~

After the install finishes, let’s edit the cypress.json config file to tell it our base url path.

*cypress.json*

~~~~
{
  "baseUrl": "http://localhost:8000"
}
~~~~

Now let’s start making our test for the submit event form. Go to the `/cypress/integration/` in the project that was generated when we installed Cypress. Delete the examples file, then make a new file for our test.

*/cypress/integration/SubmitPage.js*

~~~~
describe('Submit Page', function() {
	it('can be accessed from homepage', function() {
		cy.visit('/')
		cy.get('a').contains('Submit an Event').click()
		cy.location('pathname', {timeout: 10000}).should('include', '/submit')
		cy.get('form input[value="Submit Event"]')
	})
})
~~~~

This test simply verifies that we can go to the homepage, click the link to navigate to the `/submit` page and where we should find our submit event form. To see the test run, start the dev server and open cypress.

~~~~
npm run dev
npm run cypress:open
~~~~

When testing, we don’t want to actually hit our yet-to-be-created function and submit pull requests every time we run tests. Instead, we will have Cypress intercept the api request and stub out the responses that would normally come from the server.

For more information on how this is done, see the [Cypress examples](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/stubbing-spying__window-fetch). We will specifically be using the technique from this [Stub Fetch Example](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/stub-fetch-spec.js).

*/cypress/integration/SubmitPage.js*

~~~~
const deferred = require('./deferred')

describe('Submit Page', function() {
  it('can be accessed from homepage', function() {
    cy.visit('/')
    cy.get('a')
      .contains('Submit an Event')
      .click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/submit')
    cy.get('form input[value="Submit Event"]', { timeout: 10000 }).should(
      'exist'
    )
  })

  describe('when submitting event', function() {
    const validEventData = {
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
      endTime: '7:00pm',
    }

    // set event date to the first day of next month
    function getTestEventDate() {
      const now = new Date()
      if (now.getMonth() == 11) {
        return new Date(now.getFullYear() + 1, 0, 1)
      } else {
        return new Date(now.getFullYear(), now.getMonth() + 1, 1)
      }
    }

    // stub the response from the api
    beforeEach(function() {
      this.fetchAddEventDeferred = deferred()
      cy.visit('/submit', {
        onBeforeLoad(win) {
          cy.stub(win, 'fetch')
            .as('fetchAddEvent')
            .returns(this.fetchAddEventDeferred.promise)
        },
      })
    })

    it('can submit valid event data', function() {
      
      // fill out the form with validEventData
      cy.get('input[name=eventName]').type(validEventData.eventName)
      cy.get('textarea[name=description]').type(validEventData.description)
      cy.get('input[name=linkURL]').type(validEventData.linkURL)
      cy.get('input[name=cost]').type(validEventData.cost)
      cy.get('#datepicker-startDate').focus()
      cy.get('#datepicker-startDate').click()
      cy.get('button.react-datepicker__navigation--next').click()
      cy.get('.react-datepicker__day--001')
        .first()
        .click()
      cy.get('input[name=locationName]').type(validEventData.locationName)
      cy.get('input[name=locationStreet]').type(validEventData.locationStreet)
      cy.get('input[name=authorName]').type(validEventData.authorName)
      cy.get('input[name=authorEmail]').type(validEventData.authorEmail)

      // submit the form
      cy.get('#submitEvent').click()

      // return a success message from the stub
      this.fetchAddEventDeferred.resolve({
        json() {
          return { message: 'success' }
        },
        ok: true,
      })
      cy.get('@fetchAddEvent').should('be.calledOnce')
      cy.get('div').contains('Thanks for sending your event!').should('be.visible')
    })
  })
})
~~~~

Let’s look at our updated test file. First, we bring in a `deferred module`. This file is straight from the [Stub Fetch Example](https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/stub-fetch-spec.js). 

*/cypress/integration/deferred.js*

~~~~
// little utility for making Promise-returning stubs easier
module.exports = function () {
  const deferred = {}
  /* global Promise */
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve
    deferred.reject = reject
  })
  return deferred
}
~~~~

Since it does not contain any tests, we can tell the Cypress test runner to ignore this file by updating our config.

*cypress.json*

~~~~
{
  "baseUrl": "http://localhost:8000",
  "ignoreTestFiles": "deferred.js"
}
~~~~

Next we create a new `describe()` block for tests we will create for our event submission. We have some helpers - `validEventData` and `getTestEventDate()`. These will help generate data for our tests.

We also create a `beforeEach` method to run at the start of these tests where we first define the deferred object for our event submission then visit submit page. We have an `onBeforeLoad` function that replaces the browser’s native fetch method with a stub that returns our `fetchAddEventDeferred` promise.

*/cypress/integration/SubmitPage.js*

~~~~
beforeEach(function () {
	this.fetchAddEventDeferred = deferred()
	cy.visit('/submit', {
		onBeforeLoad (win) {
			cy.stub(win, 'fetch')
				.as('fetchAddEvent')
				.returns(this.fetchAddEventDeferred.promise)
		},
	})
})
~~~~

After this, we write out our test with various [Cypress commands](https://docs.cypress.io/guides/core-concepts/interacting-with-elements.html#Actionability) to fill out the form with the values from our `validEventData` object then submit.

At the end of the test, we resolve our `fetchAddEventDeferred` promise which simulates the api resolving the promise by returning a success message. Finally, we verify it was called once.

*/cypress/integration/SubmitPage.js*

~~~~
// submit the form
cy.get('#submitEvent').click()

// return a success message from the stub
this.fetchAddEventDeferred.resolve({
  json() {
    return { message: 'success' }
  },
  ok: true,
})
cy.get('@fetchAddEvent').should('be.calledOnce')
cy.get('div').contains('Thanks for sending your event!').should('be.visible')
~~~~

We will add more tests for the form and so we will be entering values over and over again into the form. Rather than repeating code, we can turn our form entry sequence into a [Cypress Custom Command](https://docs.cypress.io/api/cypress-api/custom-commands.html#Syntax).

By default, Cypress has a `commands.js` ready for you to use for just this purpose.

*cypress/support/commands.js*

~~~~
Cypress.Commands.add("completeEventForm", (eventData) => {
  // fill out the form with eventData
  cy.get('input[name=eventName]').type(eventData.eventName)
  cy.get('textarea[name=description]').type(eventData.description)
  cy.get('input[name=linkURL]').type(eventData.linkURL)
  cy.get('input[name=cost]').type(eventData.cost)
  cy.get('#datepicker-startDate').focus()
  cy.get('#datepicker-startDate').click()
  cy.get('button.react-datepicker__navigation--next').click()
  cy.get('.react-datepicker__day--001')
    .first()
    .click()
  cy.get('input[name=locationName]').type(eventData.locationName)
  cy.get('input[name=locationStreet]').type(eventData.locationStreet)
  cy.get('input[name=authorName]').type(eventData.authorName)
  cy.get('input[name=authorEmail]').type(eventData.authorEmail)

  // submit the form
  cy.get('#submitEvent').click()
})
~~~~

Now we can use this command in our test.

*/cypress/integration/SubmitPage.js*

~~~~
it('can submit valid event data', function() {
  cy.completeEventForm(validEventData)
...
~~~~

We can further clean up our test by removing `validEventData` and `getTestEventDate()` into a helper function that can be shared across our test suite.

*/cypress/support/helpers.js*

~~~~
const defaultEventDate = () => {
  const now = new Date()
  if (now.getMonth() == 11) {
    return new Date(now.getFullYear() + 1, 0, 1)
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1)
  }
}

module.exports = {
	getValidEventData: () => ({
    eventName: 'Test Event',
    description: 'This is not a real event. It is just for testing',
    linkURL: 'https://eventbrite.com/test-event',
    cost: 'FREE',
    locationName: '1871 Chicago',
    locationStreet: '222 W Merchandise Mart Plaza #1212',
    authorName: 'Joe Tester',
    authorEmail: 'joe@test.com',
    startDate: defaultEventDate,
    startTime: '5:00pm',
    endDate: defaultEventDate,
    endTime: '7:00pm',
  })
}
~~~~

We can use this in our completeEventForm command as default data. We can set it up so that we only need to pass in data that is different than our defaults.

*cypress/support/commands.js*

~~~~
Cypress.Commands.add("completeEventForm", (data) => {

  const eventData = {...getValidEventData(), ...data}
  ...  
~~~~

So we can update our test to use `completeEventForm()` with default data only, and remove all the stuff we moved into our helper function.

*/cypress/integration/SubmitPage.js*

~~~~
  ...
  describe('when submitting event', function() {
    // stub the response from the api
    beforeEach(function() {
      this.fetchAddEventDeferred = deferred()
      cy.visit('/submit', {
        onBeforeLoad(win) {
          cy.stub(win, 'fetch')
            .as('fetchAddEvent')
            .returns(this.fetchAddEventDeferred.promise)
        },
      })
    })

    it('can submit valid event data', function() {
      cy.completeEventForm({})
      
      // return a success message from the stub
      this.fetchAddEventDeferred.resolve({
        json() {
          return { message: 'success' }
        },
        ok: true,
      })
      cy.get('@fetchAddEvent').should('be.calledOnce')
    })
  })
~~~~

----

## Part 4: Form States

Now we have a submit form that collects data, and that’s about it. For our next step, we can set up states for sending, success and failure responses when submitting event data.

To handle these states, it is necessary to structure our components a little differently. Rather than putting `SubmitEventForm` directly on the submit page, we will wrap it in a new `SubmitEvent` component that will manage state (swap out `SubmitEventForm` for `SubmitEvent` on the submit page).

*/src/pages/submit.js*

~~~~
...
    <SubmitEvent />
  </Layout>
...
~~~~

The `SubmitEvent` component has 4 states:

- *SUBMIT_READY* - The form is ready to submit
- *SUBMIT_SENDING* - The form has been submitted and we await a response
- *SUBMIT_SUCCESS* - The submission was successful and the event was added
- *SUBMIT_FAIL* - The submission failed and the event was not added

*src/components/SubmitEvent.js*

~~~~
import React, { useState } from 'react'
import SubmitEventForm from './SubmitEventForm'

const SubmitEvent = props => {
  const SUBMIT_READY = 'SUBMIT_READY'
  const SUBMIT_SENDING = 'SUBMIT_SENDING'
  const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS'
  const SUBMIT_FAIL = 'SUBMIT_FAIL'
  const [submitState, setSubmitState] = useState(SUBMIT_READY)

  const onSubmit = eventData => {
    setSubmitState(SUBMIT_SENDING);
    return fetch(`/add-event-api-endpoint-goes-here/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    }).then(response => {
      try {
        if (response.json().message === 'success') {
          setSubmitState(SUBMIT_SUCCESS)
        } else {
          setSubmitState(SUBMIT_FAIL)
        }
      }
      catch(err) {
        setSubmitState(SUBMIT_FAIL)
        console.log(err)
      }
    })
  }
  return (
    <>
      {
        {
          [SUBMIT_READY]: <SubmitEventForm onSubmit={onSubmit} />,
          [SUBMIT_SENDING]: <div>Sending event...</div>,
          [SUBMIT_FAIL]: <div>Oops! There was a problem.</div>,
          [SUBMIT_SUCCESS]: <div>Thanks for sending your event!</div>,
        }[submitState]
      }
    </>
  )
}

export default SubmitEvent
~~~~

To test that this is working correctly, we can add to the end of our test.

*/cypress/integration/SubmitPage.js*

~~~~
...
      cy.get('@fetchAddEvent').should('be.calledOnce')
      cy.get('div').contains('Thanks for sending your event!').should('be.visible')
    })
  })
})
~~~~

Now we can add tests that verify all the form things:

- Do we prevent form submission when missing required data?
- Do we prevent form submission when there is invalid data?
- Do we handle an error response from the api?
- Can we change the hours of the event?
- Can we submit an event that spans multiple days?

To cover these cases, we need to make a few updates to our tests.

First, we will update our helpers file. We will add a function to get the default event date (we will use it when we write the test for events with multiple events). Also, there’s no sense in having a separate deferred file, so we can bring it into helper.

*/cypress/support/helpers.js*

~~~~
const defaultEventDate = () => {
  const now = new Date()
  if (now.getMonth() == 11) {
    return new Date(now.getFullYear() + 1, 0, 1)
  } else {
    return new Date(now.getFullYear(), now.getMonth() + 1, 1)
  }
}

module.exports = {
	getValidEventData: () => ({
    eventName: 'Test Event',
    description: 'This is not a real event. It is just for testing',
    linkURL: 'https://eventbrite.com/test-event',
    cost: 'FREE',
    locationName: '1871 Chicago',
    locationStreet: '222 W Merchandise Mart Plaza #1212',
    authorName: 'Joe Tester',
    authorEmail: 'joe@test.com',
    startDate: defaultEventDate,
    startTime: '5:00pm',
    endDate: defaultEventDate,
    endTime: '7:00pm',
  }),
  getDefaultEventDate: () => {
    return defaultEventDate()
  },
  deferred: () => {
    const deferred = {}
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve
      deferred.reject = reject
    })
    return deferred
  }
}
~~~~

Next, we will add to our commands. For the `completeEventForm` command, we want to enable it to enter missing and invalid data. Also, the controls for entering dates and times need to be handled a little differently. We will also add new commands to verify the success and error response to keep our test functions cleaner. 

*cypress/support/commands.js*

~~~~
import { getValidEventData } from './helpers'

Cypress.Commands.add('completeEventForm', (data) => {

  const eventData = {...getValidEventData(), ...data}

  // fill out the form with eventData
  Object.keys(eventData)
    .filter(field => field !== 'startTime' && field !== 'endTime' && field !== 'endDate')
    .forEach((field) => {
      // startTime and endTime have a default and not possible to set to empty value
      // endDate is autofilled by choosing startDate
      if (field === 'startDate') {
        if (eventData.startDate !== '' && eventData.endDate !== '') {
          cy.get('#datepicker-startDate').click()
          cy.get('button.react-datepicker__navigation--next').click()
          cy.get('.react-datepicker__day--001').first().click()
        }
      } else if (eventData[field] !== '') {
        cy.get('input[name='+field+'],textarea[name='+field+']').type(eventData[field])
      }
    })

  if (data.startTime && data.startTime !== '') {
    cy.get('#timepicker-startDate-hours').select(data.startTime.split(':')[0])
    cy.get('#timepicker-startDate-minutes').select(data.startTime.split(':')[1].substring(0,2))
    cy.get('#timepicker-startDate-period').select(data.startTime.split(':')[1].substring(2))
  }

  if (data.endTime && data.endTime !== '') {
    cy.get('#timepicker-endDate-hours').select(data.endTime.split(':')[0])
    cy.get('#timepicker-endDate-minutes').select(data.endTime.split(':')[1].substring(0,2))
    cy.get('#timepicker-endDate-period').select(data.endTime.split(':')[1].substring(2))
  }

  if (eventData.endDate !== '' && eventData.endDate !== eventData.startDate) {
    cy.get('#datepicker-endDate').click()
    cy.get('button.react-datepicker__navigation--next').click()
    cy.get('.react-datepicker__day--002').first().click()
  }

  // submit the form
  cy.get('#submitEvent').click()
})

Cypress.Commands.add('verifySubmitSuccess', (test) => {
  test.fetchAddEventDeferred.resolve({
    json() {
      return { message: 'success' }
    },
    ok: true,
  })
  cy.get('@fetchAddEvent').should('be.calledOnce')
  cy.get('div')
    .contains('Thanks for sending your event!')
    .should('be.visible')
})

Cypress.Commands.add('verifySubmitError', (test) => {
  // return an error message from the stub
  test.fetchAddEventDeferred.resolve({
    json() {
      return { message: 'error' }
    },
    ok: true,
  })
  cy.get('@fetchAddEvent').should('be.calledOnce')
  cy.get('div')
    .contains('Oops! There was a problem.')
    .should('be.visible')
})
~~~~

Now, the tests themselves.

*/cypress/integration/SubmitPage.js*

~~~~
import { deferred, getValidEventData, getDefaultEventDate } from '../support/helpers'

describe('Submit Page', function() {
  it('can be accessed from homepage', function() {
    cy.visit('/')
    cy.get('a')
      .contains('Submit an Event')
      .click()
    cy.location('pathname', { timeout: 10000 }).should('include', '/submit')
    cy.get('form input[value="Submit Event"]', { timeout: 10000 }).should(
      'exist'
    )
  })

  describe('when submitting event', function() {
    // stub the response from the api
    beforeEach(function() {
      this.fetchAddEventDeferred = deferred()
      cy.visit('/submit', {
        onBeforeLoad(win) {
          cy.stub(win, 'fetch')
            .as('fetchAddEvent')
            .returns(this.fetchAddEventDeferred.promise)
        },
      })
    })

    it('can submit valid event data', function() {
      cy.completeEventForm({})
      cy.verifySubmitSuccess(this)
    })
    
    it('requires all fields', () => {
      const validFormData = getValidEventData()
      Object.keys(validFormData).forEach(key => {
        // startTime and endTime have a default and not possible to set to empty value
        if (key != 'startTime' && key != 'endTime') {
          cy.reload()
          let formDataWithMissingValue = { ...validFormData }
          formDataWithMissingValue[key] = ''
          cy.completeEventForm(formDataWithMissingValue)
          cy.get('@fetchAddEvent').should('not.be.called')
        }
      })
    })

    it('requires a valid email', function() {
      cy.completeEventForm({authorEmail:'abc'})
      cy.get('@fetchAddEvent').should('not.be.called')
    })

    it('can handle error response', function() {
      cy.completeEventForm({})
      cy.verifySubmitError(this)
    })

    it('can change hours of event', function() {
      cy.completeEventForm({startTime:'12:00pm',endTime:'1:30pm'})
      cy.verifySubmitSuccess(this)
    })

    it('can make multiple day event', function() {
      let endDate = getDefaultEventDate()
      endDate.setDate(endDate.getDate() + 1);
      cy.completeEventForm({endDate})
      cy.verifySubmitSuccess(this)
    })
  })
})
~~~~

----

## Part 5: Building an API

Now we have our submit form and have verified that it is sending valid data. Next up, we want to create a function that transforms that data into markdown and sends it the [Github API](https://developer.github.com/v3/) as a pull request.

To use the Github API, sign up for a [Github Developer account](https://developer.github.com/). 

Once you have an account and have added a Netlify app from your events list Github repository, you will need to [generate a token](https://github.com/settings/tokens/new) so the app can call the API. When you generate the token, copy it because it will not be able to see it again.

Go to your [Netlify App](https://app.netlify.com/sites/) and add the token as a Build Environment Variable in your app.

Next, we will create the Netlify function that makes it all happen.

**Note: The following is very much based on the [add-example function](https://github.com/netlify-labs/functions-site/tree/master/functions/add-example) in the [Netlify Functions site](https://github.com/DavidWells/functions-site) by [David Wells](https://davidwells.io/)**

Ok let’s write an `add-event` function that takes some parameters then builds a markdown file to be submitted as a pull request to our events site Github repository.

Wait. What? That’s a lot. I know, but let’s just keep going...

We need to make a whole package unto itself to do all that. Make a `src/functions/add-event` directory.

~~~~
mkdir functions
mkdir functions/addevent
cd functions/addevent
npm init
~~~~

Follow along with the prompts to set up the npm package. You can hit enter a bunch of times to skip through. 

Next, install the [GitHub REST API client](https://github.com/octokit/rest.js#readme).

~~~~
npm i @octokit/rest
~~~~

Open `package.json` and edit the setting for main to be `add-event.js`. It should look like this

~~~~
{
  "name": "add-event",
  "version": "1.0.0",
  "description": "",
  "main": "add-event.js",
  "author": "John Polacek",
  "license": "MIT",
  "dependencies": {
    "@octokit/rest": "^16.3.0"
  }
}
~~~~

Next we will set up a function to create the pull request.

*src/functions/add-event/createPullRequest.js*

~~~~
module.exports = octokitCreatePullRequest

function octokitCreatePullRequest (octokit) {
  octokit.createPullRequest = createPullRequest.bind(null, octokit)
}

async function createPullRequest (octokit, { owner, repo, title, body, base, head, changes }) {
  let response

  if (!base) {
    response = await octokit.repos.get({ owner, repo })
    base = response.data.default_branch
  }

  response = await octokit.repos.listCommits({
    owner,
    repo,
    sha: base,
    per_page: 1
  })
  let latestCommitSha = response.data[0].sha
  const treeSha = response.data[0].commit.tree.sha

  response = await octokit.git.createTree({
    owner,
    repo,
    base_tree: treeSha,
    tree: Object.keys(changes.files).map(path => {
      return {
        path,
        mode: '100644',
        content: changes.files[path]
      }
    })
  })
  const newTreeSha = response.data.sha

  response = await octokit.git.createCommit({
    owner,
    repo,
    message: changes.commit,
    tree: newTreeSha,
    parents: [latestCommitSha]
  })
  latestCommitSha = response.data.sha

  await octokit.git.createRef({
    owner,
    repo,
    sha: latestCommitSha,
    ref: `refs/heads/${head}`
  })

  response = await octokit.pulls.create({
    owner,
    repo,
    head,
    base,
    title,
    body
  })
  return response
}
~~~~

*src/functions/add-event/add-event.js*

~~~~
const url = require('url')
const Octokit = require('@octokit/rest').plugin(require('./createPullRequest'))

const octokit = new Octokit()
octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_TOKEN
})

const repo = 'chicagotechevents.com'
const owner = 'johnpolacek'


/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {

  const body = JSON.parse(event.body)
  if (!body) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        data: 'Missing request body'
      })
    })
  }

  const requiredParams = ['eventName','startDate','startTime','endDate','locationName','locationStreet','locationCity','cost','linkURL','authorName','authorEmail']
  requiredParams.forEach((param) => {
    if (!body[param]) {
      return callback(null, {
        statusCode: 422,
        body: JSON.stringify({
          data: 'Missing required parameter: '+param
        })
      })
    }
  })

  const date = new Date()
  const dateStr = date.toISOString().slice(0,-14)
  const title = 'New Event - '+body.eventName
  const filename = dateStr+'-'+body.eventName.toLowerCase().split(' ').join('-');
  const filepath = 'content/eventslist/'+filename

  const newContent = `
    ---
    title: "${body.eventName}"
    startDate: "${body.startDate}"
    startTime: "${body.startTime}"
    endDate: "${body.endDate}"
    endTime: "${body.endTime}"
    locationName: "${body.locationName}"
    locationStreet: "${body.locationStreet}"
    locationCity: "${body.locationCity}"
    cost: "${body.cost}"
    eventUrl: "${body.linkURL}"
    authorName: "${body.authorName}"
    authorEmail: "${body.authorEmail}"
    ---

    ${body.description}

  `;

  octokit.createPullRequest({
    owner,
    repo,
    title: title,
    body: 'New event listing request - '+filename,
    base: 'master',
    head: `pull-request-branch-name-${date.getTime()}`,
    changes: {
      files: {
        [filepath]: newContent,
      },
      commit: 'new event listing request - '+title
    }}).then((response) => {
    console.log('data', response.data)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: `pr created!`,
        url: response.data.html_url})})}).catch((e) => {
    console.log('error', e)
    if (e.status === 422) {
      console.log('BRANCH ALREADY EXISTS!')
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          error: `BRANCH ALREADY EXISTS!`})})
    }
  })
}
~~~~

Next, we need to add some build scripts to our package.json to zip our add-event directory when we deploy to netlify.

*package.json*

~~~~
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "dev": "gatsby develop -o",
    "format": "prettier --write src/**/*.{js,jsx}",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "makedir": "rm -rf src/functions-build && mkdir functions-build",
    "zip": "cd src/functions/add-event && npm install && zip -r add-event.zip *",
    "postzip": "mv functions/add-event/add-event.zip functions-build",
    "prebuild": "npm run makedir && npm run zip"
  }
~~~~

Our script zips the add-event directory and puts it in a new directory, `functions-build`. To tell netlify about our function, we create a `netlify.toml` file.

*netlify.toml*

~~~~
[build]
command = "npm run build"
functions = "./functions-build"
~~~~

Let’s add a link to our header to our submit page.

*src/components/Header.js*

~~~~
<Header textAlign="center" pb={4} mb={2}>
  <H1 pb={2} mb={2}>{props.title}</H1>
  <H2 fontSize={2} fontWeight="normal" mb={4}>{props.description}</H2>
  <Link style={{textDecoration:'none'}} to={`/submit`}><Span bg="cyan" color="white" px={3} py={2} borderRadius="4px">Submit Event</Span></Link>
</Header>
~~~~

Last, we need to add our API endpoint to `SubmitEvent`.

*src/components/SubmitEvent.js*

~~~~
  ...
  const onSubmit = eventData => {
    setSubmitState(SUBMIT_SENDING)
    return fetch(`/.netlify/functions/add-event/`, {
  ...
~~~~


















## Make your own events site

Update the site title, description and more by editing `siteMetadata` in `gatsby-config.js`.

Change the font, colors and more by editing the settings in `src/theme.js`

Add events via markdown files in `/content/eventslist/`. Example markdown files have been provided.


--

Thanks to [David Wells](https://davidwells.io/) for answering some question while I was initially figuring things out.

Icons by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).