---
title: "Using Microservices to Orchestrate Master Data (Lambda, SNS, SQS)"
date: "2020-01-02T20:06:10.950Z"
startDate: "2020-01-15 00:00"
startTime: "5:30pm"
endDate: "2020-01-15 00:00"
endTime: "7:30pm"
locationName: "GrubHub"
locationStreet: "111 W Washington St"
locationCity: "Chicago"
locationState: "IL"
cost: "FREE"
eventUrl: "https://www.meetup.com/Chicago-Microservices-Meetup/events/266953903/"

---

In this talk, Nicholas Barger will explain how KeHE Distributors, a 5B+ distribution company is leveraging AWS Lambda, SNS, SQS, and various other technologies to orchestrate millions of transactions a week. KeHE uses a flexible JSONB schema to store master data and initiates many domain-specific data projections and events in real-time response to master data changes. Projections are fast and optimized for reads while being eventually consistent. The majority of interaction with these services are done with API Gateway through simple REST calls.

