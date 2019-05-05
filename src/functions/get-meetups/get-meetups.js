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

  // https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=-87.6298&page=20&text=tech&radius=5&lat=41.8781

  return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: `success` })
  })

  
}