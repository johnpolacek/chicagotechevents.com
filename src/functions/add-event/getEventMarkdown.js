const getEventMarkdown = (data) => {
return `---
title: "${data.eventName}"
date: "${data.date}"
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

module.exports = getEventMarkdown