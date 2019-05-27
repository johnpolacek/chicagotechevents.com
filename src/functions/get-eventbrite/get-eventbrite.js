const eventbrite = require('eventbrite').default
// const sdk = eventbrite({token: process.env.EVENTBRITE_TOKEN})


exports.handler = (event, context, callback) => {
	
	// sdk.request('/events/search?q=tech').then(res => {
	//   return callback(null, {
	//     statusCode: 200,
	//     body: JSON.stringify({ message: `success`, response: res })
	//   })
	// })
	
	return callback(null, {
	  statusCode: 200,
	  body: JSON.stringify({ message: `success`, eventbriteTypeOf: (typeof eventbrite), eventbrite: eventbrite })
	})
}

