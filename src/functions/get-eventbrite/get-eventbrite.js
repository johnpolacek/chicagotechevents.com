const fetch = require('node-fetch')

let oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const dateRange = oneWeekAgo.getFullYear()+'-'+(oneWeekAgo.getMonth()+1)+'-'+oneWeekAgo.getDate();

exports.handler = async (event, context, callback) => {
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

  const fetchUrl = 'https://www.eventbriteapi.com/v3/events/search/?q='+body.search+'&location.viewport.northeast.latitude=42.054574&location.viewport.northeast.longitude=-87.537518&location.viewport.southwest.latitude=41.751520&location.viewport.southwest.longitude=-87.712612&date_modified.range_start='+dateRange+'T06%3A50%3A27Z&token='+process.env.EVENTBRITE_TOKEN+'&expand=ticket_classes,venue&page=1'

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
  
}