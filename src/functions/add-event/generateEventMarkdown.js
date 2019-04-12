module.exports = generateEventMarkdown

const generateEventMarkdown = (data) => {
	const date = new Date()
	const dateStr = date.toISOString().slice(0,-14)
	const title = 'New Event - '+data.eventName

return `---
title: "${data.eventName}"
date: "${date.toISOString()}"
startDate: "${data.startDate}"
startTime: "${data.startTime}"
endDate: "${data.endDate}"
endTime: "${data.endTime}"
locationName: "${data.locationName}"
locationStreet: "${data.locationStreet}"
locationCity: "${data.locationCity}"
cost: "${data.cost}"
eventUrl: "${data.linkURL}"

---

${data.description}

`
}