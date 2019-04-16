module.exports = generateEventMarkdown

const generateEventMarkdown = eventData => {
  const date = new Date()
  const dateStr = date.toISOString().slice(0, -14)
  const title = "New Event - " + body.eventName
  const filename =
    dateStr +
    "-" +
    body.eventName
      .toLowerCase()
      .split(" ")
      .join("-") +
    ".md"
  const filepath = "content/eventslist/" + filename

  const newContent = `---
title: "${body.eventName}"
date: "${date.toISOString()}"
startDate: "${body.startDate}"
startTime: "${body.startTime}"
endDate: "${body.endDate}"
endTime: "${body.endTime}"
locationName: "${body.locationName}"
locationStreet: "${body.locationStreet}"
locationCity: "${body.locationCity}"
cost: "${body.cost}"
eventUrl: "${body.linkURL}"

---

${body.description}

`
}
