const eventbrite = require('eventbrite').default
const sdk = eventbrite({token: process.env.EVENTBRITE_TOKEN})

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

	sdk.request('/events/search?q='+body.search).then(res => {
	  return callback(null, {
	    statusCode: 200,
	    body: JSON.stringify({ message: `success`, response: res })
	  })
	})
}
