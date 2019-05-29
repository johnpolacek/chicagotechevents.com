const fetch = require('node-fetch')

let oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const dateRange = oneWeekAgo.getFullYear()+'-'+(oneWeekAgo.getMonth()+1)+'-'+oneWeekAgo.getDate();

exports.handler = async (event, context, callback) => {
    const response = await fetch('https://www.eventbriteapi.com/v3/events/search/?q='+body.search+'&location.viewport.northeast.latitude=42.054574&location.viewport.northeast.longitude=-87.537518&location.viewport.southwest.latitude=41.751520&location.viewport.southwest.longitude=-87.712612&date_modified.range_start='+dateRange+'T06%3A50%3A27Z&token='+process.env.EVENTBRITE_TOKEN+'&expand=ticket_classes,venue&page=1')
    const data = await response.json()
    return  {
		statusCode: 200,
		body: JSON.stringify(data)
    }
}