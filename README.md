chicagotechevents.com is an open source Gatsby site created and maintained by Chicago Web Developer [John Polacek](https://johnpolacek.com/).


# ChicagoTechEvents.com Build Log

*A step-by-step documentation of building chicagotechevents.com*

[![Netlify Status](https://api.netlify.com/api/v1/badges/62b593a7-7d74-49b1-b85f-b48f57bb426c/deploy-status)](https://app.netlify.com/sites/chicagotechevents/deploys)

----

<br>


**--W--I--P--**

- Add Sponsorships
	- Ready to deploy?

- Update Meetup API for OAuth
	- update admin page. check for location hash, if none then...
	- redirect to https://secure.meetup.com/oauth2/authorize?client_id=ch3hjqgh7nh72u5o72fdkkbeh6%20&response_type=token&redirect_uri=https%3A%2F%2Fchicagotechevents.com%2Fadmin
	- responds with https://chicagotechevents.com/admin/#access_token=36da6d1e69baa59b36cc5aed2138890c&token_type=bearer&expires_in=3600
	- then do client side meetup api requests (can remove `get-meetups` netlify function) with: 

```
fetch('https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=-87.6298&page=20&text=tech&radius=5&lat=41.8781', {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    headers: {
        'Authorization': 'Bearer 36da6d1e69baa59b36cc5aed2138890c',
        'Origin': 'https://chicagotechevents.com',
    }
}).then(res => {
    return res.json()
  }).then(data => {
    console.log('data', data);
    // do stuff with data
  }).catch((error) => {
    console.log('error', error)
  })
```

- Add Sponsorships
	- Available Dates
	- Create Ad
		- Sponsor Name and Email Contact
		- Upload Image to S3
			- onChange file input verifies size of image then submits with size params that get validated
			- compress before uploading
		- Thanks to {Sponsor Name} for sponsoring this week in Chicago Tech Events. Go to {link + link text}
		- Purchase on Stripe
		- Submits PR
- Add Featured Event
- Create JSON and RSS feed
	- https://www.gatsbyjs.org/packages/gatsby-plugin-feed-generator/
- Automate Social
- Mailchimp API 
	- [Netlify example for Mailchimp integration](https://github.com/tobilg/netlify-functions-landingpage/blob/169de175d04b165b5d4801b09cb250cd9a740da5/src/lambda/signup.js)
	- [Netlify Function for Emails](https://css-tricks.com/netlify-functions-for-sending-emails/)
- Prevent adding events that already exist by querying JSON feed- 
- Write a Talk
- Survey
- ReCAPTCHA 
	- see [docs](https://developers.google.com/recaptcha/docs/v3)
	- And [this](https://github.com/sarneeh/reaptcha)
	- alternative [honeypot](https://stackoverflow.com/questions/36227376/better-honeypot-implementation-form-anti-spam) also [this](https://stackoverflow.com/questions/26452716/how-to-create-a-nuclear-honeypot-to-catch-form-spammers)

<br>

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
				authorName
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
  "cy:open": "cypress open",
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
npm run cy:open
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

      // submit the form
      cy.get('#submitEvent').click()

      // stub return a success message with pr url 
      this.fetchAddEventDeferred.resolve({
        json() {
          return { 
        		message: 'success', 
        		url: 'https://github.com/johnpolacek/chicagotechevents.com/pull/31'
      }
        },
        ok: true,
      })
      cy.get('@fetchAddEvent').should('be.calledOnce')
      cy.get('div').contains('Thanks for sending your event!').should('be.visible')
      cy.get('#reviewLink').find('a').should('have.attr', 'href')
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
  const [pullRequestUrl, setPullRequestUrl] = useState('')

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
          setPullRequestUrl(data.url+'/files')
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
          [SUBMIT_SENDING]: <SubmitSending />,
          [SUBMIT_FAIL]: <SubmitFail />,
          [SUBMIT_SUCCESS]: <SubmitSuccess url={pullRequestUrl} />,        }[submitState]
      }
    </>
  )
}

export default SubmitEvent
~~~~

For each state, we have a corresponding component. We show a loading animation when processing the request, and then display an error or success message.

*src/components/SubmitSending.js*

~~~~
import React from 'react'
import SubmitEventMessage from './SubmitEventMessage'
import { Div, P } from 'styled-system-html'

export default props => (
  <SubmitEventMessage>
    <Div width={72}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <circle cx="50" cy="50" fill="none" stroke="#0077cc" stroke-width="5" r="35" stroke-dasharray="164.93361431346415 56.97787143782138" transform="rotate(17.9129 50 50)">
          <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
        </circle>
      </svg>
    </Div>
    <P pt={3} pb={4} width={1} color="blue">
      Sending event...
    </P>
  </SubmitEventMessage>
)
~~~~

*src/components/SubmitFail.js*

~~~~
import React from 'react'
import SubmitEventMessage from './SubmitEventMessage'
import { Div, P } from 'styled-system-html'

export default props => (
  <SubmitEventMessage>
    <Div width={72}>
      <svg height="100%" width="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path fill="#dd0000" d="m506.144531 81.855469-76-76c-3.753906-3.75-8.839843-5.855469-14.144531-5.855469h-320c-5.304688 0-10.390625 2.105469-14.144531 5.855469l-76 76c-3.75 3.753906-5.855469 8.839843-5.855469 14.144531v320c0 5.304688 2.105469 10.390625 5.855469 14.144531l76 76c3.753906 3.75 8.839843 5.855469 14.144531 5.855469h320c5.304688 0 10.390625-2.105469 14.144531-5.855469l76-76c3.75-3.753906 5.855469-8.839843 5.855469-14.144531v-320c0-5.304688-2.105469-10.390625-5.855469-14.144531zm-34.144531 325.859375-64.285156 64.285156h-303.429688l-64.285156-64.285156v-303.429688l64.285156-64.285156h303.429688l64.285156 64.285156zm-244.898438-195.597656c-2-41.378907-2.996093-70.640626-2.996093-87.765626 0-17.582031 15.902343-26.113281 33.414062-26.113281 16.054688 0 29.519531 9.292969 29.519531 26.113281 0 17.125-.429687 46.386719-1.285156 87.765626-.855468 41.386718-1.28125 70.5-1.28125 87.335937 0 12.992187-15.519531 18.839844-26.953125 18.839844-18.28125 0-27.417969-6.277344-27.417969-18.839844-.003906-16.835937-1.003906-45.949219-3-87.335937zm62.078126 168.679687c0 17.5-13.8125 32.964844-31.199219 32.964844-20.1875 0-35.160157-15.710938-35.160157-32.964844 0-17.828125 14.398438-32.964844 35.160157-32.964844 17.402343 0 31.199219 15.5 31.199219 32.964844zm0 0" />
      </svg>
    </Div>
    <P pt={3} pb={4} width={1} color="red">
      Oops! There was a problem.
    </P>
  </SubmitEventMessage>
)
~~~~

In our success message, we can link to the pull request that was opened, provided we return it from the API we have yet to create.

*src/components/SubmitSuccess.js*

~~~~
import React from 'react'
import SubmitEventMessage from './SubmitEventMessage'
import { Div, P } from 'styled-system-html'

export default props => (
  <SubmitEventMessage>
    <Div width={72}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.258 30.258" preserveAspectRatio="xMidYMid">
        <g>
          <path style={{ fill: '#0077cc' }} d="M15.129,0C6.773,0,0,6.772,0,15.13c0,8.354,6.773,15.128,15.129,15.128s15.129-6.773,15.129-15.128 C30.258,6.772,23.484,0,15.129,0z M15.129,27.854c-7.027,0-12.725-5.697-12.725-12.726c0-7.026,5.697-12.725,12.725-12.725 s12.727,5.698,12.727,12.725C27.855,22.156,22.156,27.854,15.129,27.854z" />
          <path style={{ fill: '#0077cc' }} d="M25.854,9.989l-1.762-1.762c-0.322-0.324-0.85-0.324-1.172,0L12.361,18.786l-5.023-5.061 c-0.324-0.323-0.848-0.323-1.174,0l-1.76,1.761c-0.324,0.322-0.324,0.851,0,1.175l5.586,5.626l0.016,0.025l1.219,1.219l0.283,0.281 l0.26,0.262c0.322,0.32,0.85,0.32,1.174,0l12.912-12.912C26.178,10.839,26.178,10.312,25.854,9.989z" />
        </g>
      </svg>
    </Div>
    <P pt={3} color="base">
      Thanks for sending your event!
    </P>
    <P id="reviewLink" fontSize={2} pb={4} color="gray8" fontStyle="italic">Review your event submission at <a href={props.url}>this link</a></P>
  </SubmitEventMessage>
)
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

Next we will set up a function to create the pull request (source from [Netlify’s Functions Examples](https://github.com/netlify-labs/functions-site/blob/master/functions/add-example/utils/createPullRequest.js))

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

We also need a function that will generate the markdown we need to create for the events being created through the pull request.

*src/functions/add-event/getEventMarkdown.js*

~~~~
const getEventMarkdown = (data) => {
return `---
title: "${data.eventName}"
date: "${data.date}"
startDate: "${data.startDate}"
startTime: "${data.startTime}"
endDate: "${data.endDate}"
endTime: "${data.endTime}"
locationName: "${data.locationName}"
locationStreet: "${data.locationStreet}"
locationCity: "${data.locationCity}"
cost: "${data.cost}"
eventUrl: "${data.linkURL}"

---

${data.description}

`
}

module.exports = getEventMarkdown
~~~~

Now we will create the Netlify function itself using `createPullRequest` and `getEventMarkdown`.

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

  const requiredParams = ['eventName','startDate','startTime','endDate','locationName','locationStreet','locationCity','cost','linkURL','authorName']
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

  const newContent = getEventMarkdown({...body, ...{date: date.toISOString()} })

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

Our prebuild script goes to the add-event directory then installs the dependencies and zips the files and puts the bundled function into a new directory, `functions-build`. To tell netlify about our function, we create a `netlify.toml` file that specifies a build command and where it can find our functions.

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

----

## Part 6: Deploy

After configuration, deploying to Netlify is generally as simple as pushing an update to your master branch on Gitub. Read the [Step-by-Step Guide: Deploying on Netlify](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) for more info.

To make sure our builds pass the tests, we can set up our Cypress tests to run on Netlify in a predeploy step.

The first step in setting this up is to get our tests to run headlessly. We need to install a little utility called `start-server-and-test`.

~~~~
npm install --save-dev start-server-and-test
~~~~

Now we can set up a predeploy script to run the tests every time we push a commit, and only deploy the build when it passes the tests.

*package.json*

~~~~
  "scripts": {
    ...
    "predeploy": "CI=1 npm i cypress; npm test",
    "deploy": "npm run build",
    "cy:open": "cypress open",
    "cy:run": "cypress run",
    "test": "start-server-and-test develop 8000 cy:run"
  }
~~~~

Now when you push commits, you will see the tests output to the [Netlify Deploy Log](https://www.netlify.com/blog/2017/10/31/introducing-public-deploy-logs-for-open-source-sites/). To see this in action before you push, you can now run the tests locally and see the results in your CLI.

~~~~
npm run test
~~~~

For more information about setting up testing with Gatsby and Cypress, check out this [Test All The Things](https://gatsby-blog-0a5be4.netlify.com/) project from the creator of [start-server-and-test](https://github.com/bahmutov/start-server-and-test). 

Some additional stuff we can do with our deploys:

- You can set up a notification to your email or [slack](https://www.netlify.com/blog/2016/07/18/shiny-slack-notifications-from-netlify/) whenever a new pull request comes in through the API. You can see a link to a [Deploy Preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) so you can see what the event submission will look like in addition to reviewing the code for the PR in Github.
- Add a [status badge to your repo](https://app.netlify.com/sites/chicagotechevents/settings/general#status-badges)


----

## Part 7: Design

Now that we have a working prototype of our events website, it is a good time to do some design iteration. What we have now is based on the default design in the [Gatsby Events List Starter](https://github.com/johnpolacek/gatsby-starter-events-list).

In my case, I am building website that lists tech events in Chicago, so I want to make the design more relevant by using colors and design elements that relate to Chicago.

For graphics, I created an SVG silhouette of the Chicago skyline and found an SVG file for the [flag of Chicago](https://commons.wikimedia.org/wiki/File:Flag_of_Chicago,_Illinois.svg). SVG is great because as a vector-based format it has a small file size while always looking sharp no matter how you scale it.

For colors, I made some adjustments to the [project theme file](https://github.com/johnpolacek/chicagotechevents.com/blob/master/src/theme.js) by bringing in a spectrum of values from the cyan and red in the Chicago flag.

*src/theme.js*

~~~~
  ...
  "red": "#CE112D",
  "red0": "#fef8f9",
  "red1": "#fbe9ec",
  "red2": "#f7dade",
  "red3": "#f4c8cf",
  "red4": "#f0b5bd",
  "red5": "#eb9ea9",
  "red6": "#e58392",
  "red7": "#de5f72",
  "red8": "#d1213b",
  "red9": "#810b1c",
  "cyan": "#55c1e8",
  "cyan0": "#f3fbfd",
  "cyan1": "#daf1fa",
  "cyan2": "#bee7f6",
  "cyan3": "#9fdcf2",
  "cyan4": "#7bcfed",
  "cyan5": "#54bfe6",
  "cyan6": "#4babcd",
  "cyan7": "#4193b0",
  "cyan8": "#33748b",
  "cyan9": "#1e4452"
}
~~~~

We can start using these new colors in the existing components. Our best opportunity to apply a new design is the page header. We will add a horizontal graphic with the Chicago Star and a vector graphic Chicago skyline in white silhouette on top of the header which we will set to a dark blue.

*src/components/Header.js*

~~~~
import React from 'react'
import Wrapper from './Wrapper'
import HeaderTitle from './HeaderTitle'
import HeaderDescription from './HeaderDescription'
import HeaderLink from './HeaderLink'
import StarBar from './StarBar'
import { Header, Img } from 'styled-system-html'

export default props => (
  <>
    <Header
      bg="blue7"
      color="white"
      textAlign="center"
      pt={[3, 4]}
      pb={[5, 6]}
      mb={[-3, -4, -4, -5]}
      position="relative"
    >
      <Wrapper mb={-2}>
        <HeaderTitle>{props.title.toUpperCase()}</HeaderTitle>
        <StarBar mt={[-3, -4, -4, 0]} />
        <HeaderDescription>{props.description}</HeaderDescription>
        {props.path.replace(/\/$/, '') === '/submit' ? (
          <HeaderLink to={'/'}>VIEW EVENTS</HeaderLink>
        ) : (
          <HeaderLink to={'/submit'}>SUBMIT EVENT</HeaderLink>
        )}
      </Wrapper>
      <Img
        display="block"
        position="absolute"
        bottom="-1px"
        left="0"
        width="101%"
        src="/img/skyline.svg"
      />
    </Header>
  </>
)
~~~~

*src/components/StarBar.js*

~~~~
import React from 'react'
import { Div, Img } from 'styled-system-html'

const StarBar = props => (
  <Div borderTop="solid 1px" borderColor="white" {...props}>
    <Div
      display="inline-block"
      bg="white"
      pt="6px"
      px={2}
      pb="2px"
      position="relative"
      top="-18px"
    >
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
      <Img mx={1} width={24} height={24} src="/img/chicago-star.svg" />
    </Div>
  </Div>
)

export default StarBar
~~~~

Also we can drop our star graphic into `MonthHeader`.

*src/components/MonthHeader.js*

~~~~
import React from 'react'
import PropTypes from 'prop-types'
import { Div, Img, Span } from 'styled-system-html'

const MonthHeader = props => (
  <Div
    display="flex"
    justifyContent="center"
    alignItems="center"
    color="red"
    fontWeight="bold"
    fontSize={0}
    borderTop="solid 1px"
    borderBottom="solid 1px"
    borderColor="cyan"
    textAlign="center"
    py={2}
    mt={2}
    mb={4}
  >
    <Img mx={1} width={16} height={16} src="/img/chicago-star.svg" />
    <Span mx={2} position="relative" top="1px">
      {props.month.toUpperCase()}
    </Span>
    <Img mx={1} width={16} height={16} src="/img/chicago-star.svg" />
  </Div>
)

MonthHeader.propTypes = {
  month: PropTypes.string.isRequired,
}

export default MonthHeader
~~~~

We don’t need to go into all the little changes that have been made. You can take a look at the finished product on the [Github Project Repository](https://github.com/johnpolacek/chicagotechevents.com).

----

## Part 8: Newsletter

A website is nice and all, but many people prefer to get a weekly email update with all the upcoming events delivered right to their inbox. So let’s make that happen.

First, we need to create an email template based on the front page of our website. Writing front end code for emails is very tricky. The thing to keep in mind is that all the html formatting you send is going to get parsed by the email service provider before it shows up in the inbox. There are many ESPs and they all transform your html in different ways. 

Building emails that can navigate this gauntlet of destruction is an art and science unto its own, but basically, you have to pretend that you are targeting a browser from the early days of the internet.

Some rules to follow:

* Use table layouts (I know, right?!!)
* All styling needs to be inline.
* No JS whatsoever
* Image urls need to be absolute
* Convert SVG to PNG
* Include an unsubscribe link

Luckily our design is fairly straightforward, just a single column of stacked content.

First, let’s make a new page and route which will be similar to `index.js`.

*src/pages/email.js*

~~~~
import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../theme.js'
import Header from '../components/email/Header'
import EventsByMonth from '../components/email/EventsByMonth'

class Email extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const events = data.allMarkdownRemark.edges
    const currEvents = events.filter(
      ({ node }) => new Date(node.frontmatter.endDate) >= new Date()
    )
    const eventsByMonth = {}
    currEvents.forEach(({ node }) => {
      const month =
        node.frontmatter.startDate.split(' ')[0] +
        ' ' +
        node.frontmatter.startDate.split(' ')[2]
      if (typeof eventsByMonth[month] === 'undefined') {
        eventsByMonth[month] = [{ node }]
      } else {
        eventsByMonth[month].push({ node })
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <table id="emailTemplate" cellpadding="0" style={{background:theme.colors.lite, fontFamily:theme.font, paddingBottom:'32px', borderCollapse: 'collapse'}}>
          <Header title={siteTitle} />
          <tr>
            <td style={{ paddingBottom: '0', textAlign: 'center' }}>
              View these events online at <a style={{ color: theme.colors.blue, fontSize:'18px' }} href="https://chicagotechevents.com">chicagotechevents.com</a>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '32px', textAlign: 'center', fontSize:'14px' }}>
              <a style={{color: theme.colors.blue}} href="*|UNSUB|*">Unsubscribe</a> to stop receiving updates
            </td>
          </tr>
          <EventsByMonth eventsByMonth={eventsByMonth} />
        </table>
      </ThemeProvider>
    )
  }
}

export default Email

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___startDate], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            startDate(formatString: "MMMM DD, YYYY")
            startTime
            endDate(formatString: "MMMM DD, YYYY")
            endTime
            locationName
            locationStreet
            locationCity
            locationState
            cost
            eventUrl
          }
        }
      }
    }
  }
`
~~~~

Next, we will create separate versions of our components to make an email newsletter that is similar in design to our homepage events list.

*src/components/email/Header.js*

~~~~
import React from 'react'
import theme from '../../theme'

export default props => (
  <>
    <tr style={{ background: theme.colors.blue7, textAlign: 'center' }}>
      <td style={{ padding: '32px 0 8px' }}>
        <h1 style={{margin: '8px 0 0', fontWeight:'normal', fontSize: '42px', color: '#fff', textAlign: 'center' }}>{props.title.toUpperCase()}</h1>
      </td>
    </tr>
    <tr>
      <td>
        <img alt="Chicago Stars and Skyline" style={{width:'100%',height:'auto'}} src="https://chicagotechevents.netlify.com//img/email-header.png" />
      </td>
    </tr>
  </>
)
~~~~

*src/components/email/Event.js*

~~~~
import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../theme'
import { getEventDateString } from '../util'

const Event = props => (
  <tr>
    <td colspan="3" key={props.url} style={{padding: '16px 0 32px', marginBottom: '32px', borderBottom: props.isLast ? 'none' : 'solid 1px #ccc' }}>
      <h2 style={{ color: theme.colors.base, fontSize: '30px'}}>{props.title}</h2>
      <p style={{ color: theme.colors.red, fontStyle:"italic", fontWeight:"bold", fontSize: '14px', marginBottom: '8px'}}>
        {getEventDateString(
          props.startDate,
          props.startTime,
          props.endDate,
          props.endTime
        )}
      </p>
      <p style={{ fontSize:'16px', marginBottom:'16px' }} dangerouslySetInnerHTML={{__html: props.content}} />
      <p style={{ fontSize:'14px', marginBottom:'16px', fontWeight:'600', lineHeight: '1.4', fontStyle: 'italic' }}>
        <span>{props.locationName}</span>
        <br />
        {props.locationStreet}
        <br />
        {props.locationCity}, {props.locationState}
        <br />
      </p>
      <p style={{ color: theme.colors.gray8, fontWeight:"600", fontSize: '14px', marginBottom: '8px' }}>
        Cost: {props.cost}
      </p>
      <p style={{ fontWeight:"bold", fontSize: '14px', marginBottom: '8px' }}>
        Go to event:{' '}
        <a style={{ fontWeight:"bold", marginLeft: '4px' }} href={props.eventUrl}>
          {props.eventUrl
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace(/\/$/, '')}
        </a>
      </p>
    </td>
  </tr>
)

Event.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  locationName: PropTypes.string.isRequired,
  locationStreet: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
}

export default Event
~~~~

*src/components/email/EventsByMonth.js*

~~~~
import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../theme'
import Event from './Event'

const StarIcon = () => <img alt="Chicago Star Icon" width="16px" height="16px" src="https://chicagotechevents.netlify.com/img/chicago-star.png" />

const EventsByMonth = props => {
  return Object.keys(props.eventsByMonth).map(month => {
    return (
      <tr key={month}>
        <td>
          <table style={{width:'100%'}}>
            <tr style={{
              borderTop: 'solid 1px '+theme.colors.cyan, 
              borderBottom: 'solid 1px '+theme.colors.cyan,
              paddingTop: '2px'
            }}>
              <td style={{width:'33%',textAlign:'right', paddingTop:'3px'}}><StarIcon /></td>
              <td style={{textAlign:'center', color: theme.colors.red, fontWeight:'bold', fontSize: '14px', }}>{month.toUpperCase()}</td>
              <td style={{width:'33%',textAlign:'left', paddingTop:'3px'}}><StarIcon /></td>
            </tr>
            {props.eventsByMonth[month].map(({ node }, i, events) => (
              <Event
                {...{
                  key: node.fields.slug,
                  url: node.fields.slug,
                  title: node.frontmatter.title || node.fields.slug,
                  startDate: node.frontmatter.startDate,
                  startTime: node.frontmatter.startTime,
                  endDate: node.frontmatter.endDate,
                  endTime: node.frontmatter.endTime,
                  locationName: node.frontmatter.locationName,
                  locationStreet: node.frontmatter.locationStreet,
                  locationCity: node.frontmatter.locationCity,
                  locationState: node.frontmatter.locationState,
                  cost: node.frontmatter.cost,
                  eventUrl: node.frontmatter.eventUrl,
                  content: node.frontmatter.description || node.excerpt,
                  isLast: i === events.length - 1,
                }}
              />
            ))}
          </table>
        </td>
      </tr>
    )
  })
}

EventsByMonth.propTypes = {
  eventsByMonth: PropTypes.object.isRequired,
}

export default EventsByMonth
~~~~

Now we can deploy and access the new email template from `/email`.

To manage our email list and batch send to our subscribers, we will use [Mailchimp](https://mailchimp.com/) which has a convenient [free plan](https://mailchimp.com/pricing/) that will allow us to send emails to up to 2,000 subscribers.

After you sign up for a Mailchimp account, create a new 1-column template. Run a build of the site, then open `public/email/index.html` and grab all the markup in `#emailTemplate` to paste into the template body. 

You can then save the template and send test emails. You can also test your email code with tools like [Litmus](https://litmus.com/) or [HTML Email Check](https://www.htmlemailcheck.com/check/).

Once you are happy with the template, you can create a campaign. To get started, send the campaign to yourself. Ideally, you can open it in a few different email service providers and on different devices to get a fuller preview of what it will look like. 

Next, we need to add a way for people to subscribe to the newsletter. 

Based on this [react-mailchimp-subscribe](https://github.com/revolunet/react-mailchimp-subscribe) module, we will create a Subscribe component.

*src/components/Subscribe.js*

~~~~
import React, { useState } from 'react'
import jsonp from 'jsonp'
import { Div, P, Form, Input } from 'styled-system-html'
import InputSubmit from './InputSubmit'

const SubmitEventForm = props => {

  const READY = 'READY'
  const SENDING = 'SENDING'
  const SUCCESS = 'SUCCESS'
  const ERROR = 'ERROR'

  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(READY)

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus(SENDING)
    if (e.target.checkValidity()) {
      jsonp(
        '//chicagotechevents.us9.list-manage.com/subscribe/post-json?u=a34a4e936e02d56a1d856f609&id=5062422f20&EMAIL='+email,
        {
          param: 'c'
        },
        (err, data) => {
          if (err) {
            console.dir({
              status: "error",
              message: err
            })
            setStatus(ERROR)
          } else if (data.result !== "success") {
            console.dir({
              status: "error",
              message: data.msg
            })
            setStatus(ERROR)
          } else {
            console.dir({
              status: "success",
              message: data.msg
            })
            setStatus(SUCCESS)
          }
        }
      )
    }
  }

  return (
    <Div textAlign="center" style={{position:'relative', zIndex:999}} mb={5}>
      <P fontSize={[1,2,3]} fontWeight={500} mb={2}>Subscribe to get weekly event updates</P>
      {
        (status === READY || status === ERROR) && 
        <Form width={[360,450]} mx="auto" px={3} onSubmit={onSubmit}>
          <Input id="subscribeEmail" value={email} onChange={(e) => setEmail(e.target.value)} width={[3/5,2/3]} borderColor="base" border="1px solid" type="email" placeholder="Your email" />
          <InputSubmit width={[2/5,1/3]} textAlign="center" bg="base" fontSize={1} mt="-1px" py="9px" px={0} style={{borderRadius:'0 8px 8px 0'}} id="submitSubscribe" value="SUBSCRIBE" />
        </Form>
      }
      {
        status === SENDING && 
        <P pt={2} pb={4} fontSize={1} fontStyle="italic" color="base">Subscribing...</P>
      }
      {
        status === ERROR && 
        <P fontSize={1} pt={4} color="red">Sorry, there was an error. Maybe try again?</P>
      }
      {
        status === SUCCESS && 
        <P py={4} fontSize={2} color="base">All set. Thanks for subscribing!</P>
      }
    </Div>
  )
}

export default SubmitEventForm
~~~~


Let’s add our Subscribe component to the top of the events list.

*src/pages/index.js*

~~~~
...
import Subscribe from '../components/Subscribe'
...
  <SEO
    title="Events"
    keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
  />
  <Subscribe />
  <EventsByMonth eventsByMonth={eventsByMonth} />
...
~~~~

## Part 9: Admin

Currently, we can add events to our list via event submissions or entering them in ourselves. We want to create a way to import events from Meetup and Eventbrite. We can create new Netlify functions that pull in event data straight from their APIs.

Before we do that though, let’s create a special area of the site for us to access these APIs and use them to add events to the site. The new page component will be very similar to our other pages.

*src/pages/admin.js*

~~~~
import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import AdminView from '../components/AdminView'

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {signedIn:false}
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
      >
        <SEO
          title="Admin"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
          meta={[{
            name: `robots`,
            content: `noindex`,
          }]}
        />
        <Wrapper>
          <AdminView />
        </Wrapper>
      </Layout>
    )
  }
}

export default Admin

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
~~~~

It seems like overkill to set up user management and login just to create an admin area. We aren't dealing with private user data or confidential information. The event info is publicly available, and we are only creating a means of curating and sharing it.

Therefore, we can create a PIN that can be used to access the admin area of the site. With Netlify we can create environment variables that can contain things like API keys, and we can use on of these to store our PIN. Then, we can create a new Netlify Function to verify the PIN.

*src/functions/admin.js*

~~~~
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

  if (body.adminCode && body.adminCode === process.env.ADMIN_CODE) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: `success` })
    })
  } else {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        data: 'Invalid request',
      })
    })
  }
}
~~~~

We’ll need to update our functions build script.

*package.json*

~~~~
...
"postzip": "mv src/functions/add-event/add-event.zip functions-build && cp src/functions/admin.js functions-build",
...
~~~~

Next, we set up our admin view with a basic form for an admin to enter the PIN code and gain access.

*src/components/AdminView.js*

~~~~
import React, { useState } from 'react'
import { Div, H2, Form, Input } from 'styled-system-html'
import AdminViewEvents from './AdminViewEvents'
import InputSubmit from './InputSubmit'

const AdminView = props => {
  const SIGNIN_READY = 'SIGNIN_READY'
  const SIGNIN_SENDING = 'SIGNIN_SENDING'
  const SIGNIN_FAIL = 'SIGNIN_FAIL'
  const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'

  const [signedIn, setSignedIn] = useState(SIGNIN_READY)
  const [adminCode, setAdminCode] = useState('')

  const onSignIn = e => {
    e.preventDefault()
    setSignedIn(SIGNIN_SENDING)

    try {
      return fetch(`/.netlify/functions/admin/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminCode }),
      })
        .then(response => response.json())
        .then(data => {
          setSignedIn(data.message === 'success' ? SIGNIN_SUCCESS : SIGNIN_FAIL)
        })
    } catch (err) {
      setSignedIn(SIGNIN_FAIL)
    }
  }

  return (
    <>
      <H2 pb={4} fontSize={5} textAlign="center" fontWeight="200" color="base">
        ADMIN
      </H2>
      {
        {
          [SIGNIN_READY]: (
            <Form onSubmit={onSignIn} pb={5} textAlign="center">
              <Input
                type="password"
                fontSize={0}
                width={160}
                mr={2}
                id="adminCode"
                value={adminCode}
                onChange={e => setAdminCode(e.target.value)}
              />
              <InputSubmit fontSize={1} py={2} value="SIGN IN" />
            </Form>
          ),
          [SIGNIN_SENDING]: (
            <Div textAlign="center" py={5} fontStyle="italic">
              Sending...
            </Div>
          ),
          [SIGNIN_FAIL]: (
            <Div textAlign="center" py={5} color="red">
              Could not access admin.
            </Div>
          ),
          [SIGNIN_SUCCESS]: <AdminViewEvents adminCode={adminCode} />,
        }[signedIn]
      }
    </>
  )
}

export default AdminView
~~~~

Next up, we will create a new `get-meetups` function and an `AdminViewEvents` component for the admin to review the meetup events and add them to the list.


## Part 10: Importing Events

You can get access to the [Meetup API](https://www.meetup.com/meetup_api/) by signing up for an account and requesting a key.

Once you have a key, add it as an [Environment variable](https://app.netlify.com/sites/chicagotechevents/settings/deploys#environment) to Netlify under the project build settings.

Next, create a new `get-meetups` in `src/functions`.
Create a new `package.json` and install the [Meetup API library for Node](https://github.com/jkutianski/meetup-api#readme)

*src/functions/get-meetups/package.json*

~~~~
{
  "name": "get-meetups",
  "version": "1.0.0",
  "main": "get-meetups",
  "author": "John Polacek",
  "license": "MIT",
  "dependencies": {
    "meetup-api": "^1.4.38"
  }
}
~~~~

We will be creating a function that returns all the upcoming tech meetups in and around Chicago. 

Use [Meetup API console](https://secure.meetup.com/meetup_api/console/) to build a search query and test that it returns good results. To be able to load events beyond just the initial batch of 20 results, we can add an offset to grab the next batch of event data.

In our case, we will be using the `/find/upcoming_events` endpoint

Once satisfied, we can copy the Request URL and bring it into a `get-meetups` function.

*src/functions/get-meetups.js*

~~~~
const meetup = require('meetup-api')({
	key: process.env.MEETUP_KEY
})

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

  if (!body.search) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        data: 'Missing search parameter'
      })
    })
  }

  meetup.getUpcomingEvents({
    lat: 41.8781,
    lon: -87.6298,
    text: body.search,
    radius: 5
  }, function(err, res) {
      if (err) {
        return callback(null, {
          statusCode: 422,
          body: JSON.stringify({ message: `Could not load events`, error: err, response: res })
        })
      } else {
        return callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: `success`, response: res })
        })
      }
  });  
}
~~~~

Now let’s create a React component that can load meetup events from our function.

*src/components/AdminViewEvents.js*

~~~~
import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { Div, Form, Input } from 'styled-system-html'
import Button from './Button'
import InputSubmit from './InputSubmit'
import AdminEvent from './AdminMeetupEvent'

const AdminViewEvents = props => {

  const MEETUPS_READY = 'MEETUPS_READY'
  const MEETUPS_LOADING = 'MEETUPS_LOADING'
  const MEETUPS_FAIL = 'MEETUPS_FAIL'

  const [meetupSearch, setMeetupSearch] = useState('tech')
  const [meetupSearchStatus, setMeetupSearchStatus] = useState(MEETUPS_READY)
  const [meetupData, setMeetupData] = useState(null)
  const [resultSet, setResultSet] = useState(0)

  const onSearchMeetups = e => {
    e.preventDefault()
    setMeetupSearchStatus(MEETUPS_LOADING)

    try {
      return fetch(`/.netlify/functions/get-meetups/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminCode: props.adminCode,
          search: meetupSearch,
          page: resultSet
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (
            data.message === 'success' &&
            typeof data.response.events === 'object'
          ) {
            setMeetupData(data.response.events.filter((event) => event.venue))
            setMeetupSearchStatus(MEETUPS_READY)
          } else {
            setMeetupSearchStatus(MEETUPS_FAIL)
          }
        })
    } catch (err) {
      setMeetupSearchStatus(MEETUPS_FAIL)
    }
  }

  const onLoadMore = e => {
    setResultSet(resultSet+1)
    onSearchMeetups(e)
  }

  return (
    <>
      <Form onSubmit={onSearchMeetups} pb={5} textAlign="center">
        <Input
          type="text"
          fontSize={0}
          width={160}
          mr={2}
          id="meetupSearch"
          name="meetupSearch"
          value={meetupSearch}
          onChange={e => setMeetupSearch(e.target.value)}
        />
        <InputSubmit
          bg={meetupSearchStatus === MEETUPS_READY ? 'base' : 'gray'}
          fontSize={1}
          py={2}
          value={
            meetupSearchStatus === MEETUPS_LOADING ? 'SEARCHING...' : 'SEARCH'
          }
          disabled={meetupSearchStatus === MEETUPS_LOADING}
        />
      </Form>
      {meetupSearchStatus === MEETUPS_FAIL && (
        <Div color="red">Could not load meetup data</Div>
      )}
      {meetupData && meetupData.length && (
        <>
          <Div id="meetupEvents" py={4}>
            {meetupData.map(event => (
              <AdminEvent key={event.id} event={event} />
            ))}
          </Div>
          <Div textAlign="center" pb={5}>
            <Button py={3} px={4} fontSize={3} onClick={onLoadMore} bg="base" color="white">Load More</Button>
          </Div>
        </>
      )}
    </>
  )
}

AdminViewEvents.propTypes = {
  adminCode: PropTypes.string.isRequired,
}

export default AdminViewEvents
~~~~

Our component begins in a `MEETUPS_READY` state with a search input that starts off defaulted to ‘tech’. When the search is submitted, it hits our function then renders the results to an `AdminEvent` component that we will create now.

*src/components/AdminEvent.js*

~~~~
import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { meetupDataToEventData } from './util'
import AdminEventInfo from './AdminEventInfo'
import SubmitEvent from './SubmitEvent'

const AdminEvent = props => {
  const VIEW_INFO = 'VIEW_INFO'
  const VIEW_ADD = 'VIEW_ADD'
  const [view, setView] = useState(VIEW_INFO)

  const event = props.event
  console.log('event',event)

  return (
    <>
      {
        {
          [VIEW_INFO]: (
            <AdminEventInfo
              event={event}
              onAddEvent={() => {
                setView(VIEW_ADD)
              }}
            />
          ),
          [VIEW_ADD]: <SubmitEvent instructions="Please review the info below before adding the event." eventData={meetupDataToEventData(event)} />,
        }[view]
      }
    </>
  )
}

AdminEvent.propTypes = {
  event: PropTypes.object.isRequired,
}

export default AdminEvent
~~~~

The `AdminEvent` component has 2 view states:

- `VIEW_INFO` - Displays the event info via a new `AdminEventInfo` component.
- `VIEW_ADD` - Edit the event info the add to the events list via our existing `SubmitEvent` component.


*src/components/AdminEventInfo.js*

~~~~
import React from 'react'
import { PropTypes } from 'prop-types'
import { Div, H3, Span, A, Button } from 'styled-system-html'

const AdminEventInfo = props => (
  <Div pb={4}>
    <Span fontSize={0}>
      {props.event.local_date} {props.event.local_time}
    </Span>
    <H3>
      {props.event.name}{' '}
      <A
        color="base"
        fontWeight="normal"
        fontSize={0}
        ml={1}
        href={props.event.link}
        target="_blank"
      >
        view event
      </A>
    </H3>
    <Div
      mb={2}
      fontSize={1}
      height="48px"
      overflow="hidden"
      dangerouslySetInnerHTML={{ __html: props.event.description }}
    />
    <Button
      onClick={props.onAddEvent}
      px={3}
      borderRadius="6px"
      fontSize={0}
      bg="cyan"
      color="white"
    >
      Add Event
    </Button>
  </Div>
)

AdminEventInfo.propTypes = {
  event: PropTypes.object.isRequired,
  onAddEvent: PropTypes.func.isRequired,
}

export default AdminEventInfo
~~~~

And of course, we should have a test to verify this is working as expected. Once again, we can stub out our fetch requests to our Netlify functions.

*cypress/integration/Admin.js*

~~~~
import {
  deferred,
  getMeetupResults,
} from '../support/helpers'

describe('Admin', function() {
  beforeEach(function() {
    this.fetchSigninDeferred = deferred()
    this.fetchMeetupDeferred = deferred()
    this.fetchAddEventDeferred = deferred()
    cy.visit('/admin', {
      onBeforeLoad(win) {
        let s = cy.stub(win, 'fetch');
        s.withArgs('/.netlify/functions/admin/')
          .as('fetchEmailAddress')
          .returns(this.fetchSigninDeferred.promise)
        s.withArgs('/.netlify/functions/get-meetups/')
          .as('fetchMeetup')
          .returns(this.fetchMeetupDeferred.promise)
        s.withArgs('/.netlify/functions/add-event/')
          .as('fetchAddEvent')
          .returns(this.fetchAddEventDeferred.promise)
      },
    })
  })

  it('can get meetups and submit', function() {
    cy.get('#adminCode').type('123') // not the real admin code, just for testing ;)
    cy.get('input[type=submit]').click()
    this.fetchSigninDeferred.resolve({
      json() {
        return { message: 'success' }
      },
      ok: true,
    })
    cy.get('#meetupSearch').should('have.value', 'tech')
    cy.get('input[value=SEARCH]').click()
    this.fetchMeetupDeferred.resolve({
      json() {
        return getMeetupResults(0)
      },
      ok: true,
    })
    cy.get('div').contains('The WTF Lounge').should('be.visible')
    cy.get('a[href="https://www.meetup.com/Women-Tech-Founders-WTF-of-Chicago/events/258446391/"]').should('be.visible')
    cy.get('#meetupEvents').contains('Add Event').first().click()
    cy.get('#submitEvent').click()
    cy.get('@fetchAddEvent').should('not.be.called') // requires address
    cy.get('input[name=locationStreet]').type('222 W Merchandise Mart Plaza')
    cy.get('#submitEvent').click()
    this.fetchAddEventDeferred.resolve({
      json() {
        return { 
          message: 'success',
          url: 'https://github.com/johnpolacek/chicagotechevents.com/pull/31'
        }
      },
      ok: true,
    })

    cy.get('@fetchAddEvent').should('be.called')
    cy.get('div')
      .contains('Thanks for sending your event!')
      .should('be.visible')
    cy.get('#reviewLink')
      .find('a')
      .should('have.attr', 'href', 'https://github.com/johnpolacek/chicagotechevents.com/pull/31/files')
  })
  
})
~~~~


## Part 11: Component Organization

It can be a mistake to create subdirectories too soon in a project. I prefer to wait until it starts feeling too crowded in `/src/components` and we are at that point now.

`/admin`  
We can move all the admin components into this subdirectory and remove the Admin prefix from the component (e.g. `AdminEventInfo` becomes `EventInfo`)

`/email`  
We already have this subdirectory in our project.

`/forms`  
Our main form `SubmitEvent`, states like `SubmitSending` and `SubmitFail`, and controls like `InputSubmit` and `TimePicker` go in here. We could further split these into subdirectories, but we’re not there yet.

`/events`  
All the event-related components from our events list view go here.

`/layout`  
All the higher-level layout components like `Body`, `Wrapper` and `Layout` go here.

`/ui`  
UI components like `Button`, `Header` and `StarBar` go here.

**Note: When re-organizing your components into subdirectories, the CLI output is your best friend**

--

## Part 12: Eventbrite

We have Meetup as one source of events for our site. Now we can add Eventbrite as an additional source.

For this, will need an Eventbrite account and [OAuth Token](https://www.eventbrite.com/platform/docs/authentication). We will be making a fetch request to the [Event Search](https://www.eventbrite.com/platform/api#/reference/event-description/set/search-events) API endpoint.

*src/functions/get-eventbrite*

~~~~
{
  "name": "get-eventbrite",
  "version": "1.0.0",
  "main": "get-eventbrite.js",
  "author": "John Polacek",
  "license": "MIT"
 }
~~~~

Then install [node-fetch](https://github.com/bitinn/node-fetch).

~~~~
npm install node-fetch
~~~~






Eventbrite function stuff here



We will need to update our build script to zip our new function.

*package.json*

~~~~
...
"zip": "cd src/functions/add-event && npm install && zip -r add-event.zip * && cd ../get-meetups && npm install && zip -r get-meetups.zip * && cd ../get-eventbrite && npm install && zip -r get-eventbrite.zip *",
"postzip": "mv src/functions/add-event/add-event.zip functions-build && mv src/functions/get-meetups/get-meetups.zip functions-build && mv src/functions/get-eventbrite/get-eventbrite.zip functions-build && cp src/functions/admin.js functions-build",
...
~~~~

Now over on the component-side, we need to do some renaming/refactoring to allow for two event sources.

First, we will rename our Adming Meetup components to more abstract Event components and re-run our tests to make sure we didn’t break anything.

Next, we edit the `ViewEvents` component to have two search modes - one for Meetup and one for Eventbrite. To do this, I will bring in a `Toggle` component that I had created for a different project (Styled System is great for creating portable UI components).




----

Thanks to [David Wells](https://davidwells.io/) for answering some questions for me while I was initially figuring out how to connect a Netlify function to the Github API.

Icons by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).
