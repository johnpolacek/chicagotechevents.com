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

  const fetchUrl = 'https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&lon=-87.6298&page=20&text=tech&radius=5&lat=41.8781'

  return fetch(fetchUrl).then(res => {
    return res.json()
  }).then(data => {
    console.log('data', data);
    return  {
      statusCode: 200,
      body: JSON.stringify({ message: `success`, response: data, url: fetchUrl })
    }
  }).catch((error) => {
    console.log('error', error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })

  // meetup.getUpcomingEvents({
  //   lat: 41.8781,
  //   lon: -87.6298,
  //   text: body.search,
  //   offset: body.page || 0,
  //   radius: 5
  // }, function(err, res) {
  //     if (err) {
  //       return callback(null, {
  //         statusCode: 422,
  //         body: JSON.stringify({ message: `Could not load events`, error: err, response: res })
  //       })
  //     } else {
  //       return callback(null, {
  //         statusCode: 200,
  //         body: JSON.stringify({ message: `success`, response: res })
  //       })
  //     }
  // });  
}