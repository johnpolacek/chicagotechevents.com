const url = require('url')
const Octokit = require('@octokit/rest').plugin(require('./createPullRequest'))

const octokit = new Octokit()
octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_TOKEN})

const repo = 'chicagotechevents.com'
const owner = 'johnpolacek'
const fileToChange = 'src/tutorials.json'

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  // const { clientContext } = context

  // const body = JSON.parse(event.body)
  // console.log('body', body)

  // if (!body || !body.name) {
  //   return callback(null, {
  //     statusCode: 401,
  //     body: JSON.stringify({
  //       data: 'request malformed'})})
  // }

  const date = new Date()
  const title = 'New Event from API'
  const filename = date+'-'+title.toLowerCase().split(' ').join('-')+'.md'

  const newContent = `---
    title: ${title}
    date: ${date.toISOString().slice(0,-14)}
    ---
    Event description goes here
  `;

  octokit.createPullRequest({
    owner,
    repo,
    title: title,
    body: 'Add New Event from API - '+title,
    base: 'master',
    head: `pull-request-branch-name-${new Date().getTime()}`,
    changes: {
      files: {
        [filename]: newContent,
      },
      commit: `adding New Event from API`
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