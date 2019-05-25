const eventbrite = require('eventbrite')
const sdk = eventbrite({token: process.env.EVENTBRITE_TOKEN})

sdk.request('/events/search?q=tech').then(res => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({ message: `success`, response: res })
  })
})