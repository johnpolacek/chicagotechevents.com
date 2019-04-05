## WIP

- Restructure README to do front end first with the submit form
- Create FormControl component
- Test the form submit - [see here](https://medium.com/front-end-weekly/tested-react-build-and-test-a-form-using-react-context-81870af6a9ac)
- Auto set end date to same as start date
- Create and test a markdown generator util function [see here](https://blog.benestudio.co/why-should-we-separate-the-utility-functions-bc4eea28022f)
- Paginate
- Old events should be on separate page


----

# chicagotechevents.com

Forked from the [Gatsby Events List Starter](https://github.com/johnpolacek/gatsby-starter-events-list).

--

### Build Log

Use the Gatsby CLI to create a new events list from the starter.

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
        <SubmitEventForm />
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

There isn’t too much going on with this page. Most of our work here is done within a `SubmitEventForm` component that we will now create.

In this form, we will have all the fields necessary for generating a new markdown file that will be submitted in a pull request to be reviewed to get added to the site.

On submit, we will...











*/src/components/SubmitEventForm.js*

~~~~
import React, { useState } from 'react'
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
		saveEvent({eventName,description,linkURL,cost,startDate,startTime,endDate,endTime,locationName,locationStreet,locationCity,authorName,authorEmail}).then((response) => {
	        console.log('response', response)
	    }).catch((e) => {
	        console.log('response err', e)
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


async function saveEvent(event) {
	console.log('save event', event)
	return fetch(`/.netlify/functions/add-event/`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(event),
	}).then(response => {
		console.log(response)
		return response.json()
	})
}

export default SubmitEventForm

~~~~




Next, sign up for a [Github Developer account](https://developer.github.com/) to get access to their API. 

Once you have an account and have added a Netlify app from your events list Github repository, you will need to [generate a token](https://github.com/settings/tokens/new) so the app can call the API. When you generate the token, copy it because it will not be able to see it again.

Go to your [Netlify App](https://app.netlify.com/sites/) and add the token as a Build Environment Variable in your app.

Next, we will create the Netlify function that makes it all happen.

**Note: The following is very much based on the [add-example function](https://github.com/netlify-labs/functions-site/tree/master/functions/add-example) in the [Netlify Functions site](https://github.com/DavidWells/functions-site) by [David Wells](https://davidwells.io/)**

Ok let’s write an `add-event` function that takes some parameters then builds a markdown file to be submitted as a pull request to our events site Github repository.

Wait. What? That’s a lot. I know, but let’s just keep going...

We need to make a whole package unto itself to do all that. Make a `/functions/add-event` directory.

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

*functions/add-event/createPullRequest.js*

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

*functions/add-event/add-event.js*

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
    "makedir": "rm -rf functions-build && mkdir functions-build",
    "zip": "cd functions/add-event && npm install && zip -r add-event.zip *",
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







To test functions locally install netlify-lambda and make api calls against localhost:9000



Let’s add a link to our header to a new page with an add event form.

*src/components/Header.js*

~~~~
<Header textAlign="center" pb={4} mb={2}>
  <H1 pb={2} mb={2}>{props.title}</H1>
  <H2 fontSize={2} fontWeight="normal" mb={4}>{props.description}</H2>
  <Link style={{textDecoration:'none'}} to={`/submit`}><Span bg="cyan" color="white" px={3} py={2} borderRadius="4px">Submit Event</Span></Link>
</Header>
~~~~   




Thanks to David Wells 

## Customize

Update the site title, description and more by editing `siteMetadata` in `gatsby-config.js`.

Change the font, colors and more by editing the settings in `src/theme.js`

Add events via markdown files in `/content/eventslist/`. Example markdown files have been provided.

## Deploy

~~~~
npm run build
~~~~

Publish the `public` directory to a webhost or deploy with [Netlify](https://www.netlify.com/docs/).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/johnpolacek/gatsby-starter-events-list)


--

Calendar icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).