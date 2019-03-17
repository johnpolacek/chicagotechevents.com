const url = require('url')
const Octokit = require('@octokit/rest').plugin(require('./createPullRequest'))

const octokit = new Octokit()
octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_TOKEN})

const repo = 'chicagotechevents.com'
const owner = 'johnpolacek'

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {

  // const body = JSON.parse(event.body)
  // console.log('body', body)

  // if (!body || !body.name) {
  //   return callback(null, {
  //     statusCode: 401,
  //     body: JSON.stringify({
  //       data: 'request malformed'})})
  // }

  const date = new Date()
  const dateStr = date.toISOString().slice(0,-14)
  const title = 'New Event from API'
  const filename = dateStr+'-'+title.toLowerCase().split(' ').join('-');
  const filepath = 'content/eventslist/'+filename

  const newContent = `---
    ---
    title: ${title}
    date: "${date}"
    timestart: "14:00"
    timeend: "16:00"
    locationName: Someplace
    locationAddress: 123 N State
    locationCity: Chicago
    locationState: IL
    cost: FREE
    eventUrl: https://eventbrite.com/some-event

    ---

    Event description goes here.

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
    }})
}