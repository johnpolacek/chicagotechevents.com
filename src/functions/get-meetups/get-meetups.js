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

  // https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=-87.6298&page=20&text=tech&radius=5&lat=41.8781&offset=0
  // https://secure.meetup.com/meetup_api/console/?path=/find/upcoming_events

  meetup.getUpcomingEvents({
    lat: 41.8781,
    lon: -87.6298,
    text: 'tech',
    offset: body.offset || 0,
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