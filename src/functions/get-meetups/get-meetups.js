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
    offset: body.page || 0,
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