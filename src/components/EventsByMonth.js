import React from "react"
import PropTypes from "prop-types"
import MonthHeader from "../components/MonthHeader"
import Event from "../components/Event"
import { Div } from "styled-system-html"

const EventsByMonth = props => {
  return Object.keys(props.eventsByMonth).map(month => {
    return (
      <Div key={month} pb={4}>
        <MonthHeader month={month} />
        {props.eventsByMonth[month].map(({ node }) => (
          <Event
            {...{
              url: node.fields.slug,
              title: node.frontmatter.title || node.fields.slug,
              startDate: node.frontmatter.startDate,
              startTime: node.frontmatter.startTime,
              endDate: node.frontmatter.endDate,
              endTime: node.frontmatter.endTime,
              locationName: node.frontmatter.locationName,
              locationStreet: node.frontmatter.locationStreet,
              locationCity: node.frontmatter.locationCity,
              locationState: node.frontmatter.locationState,
              cost: node.frontmatter.cost,
              eventUrl: node.frontmatter.eventUrl,
              content: node.frontmatter.description || node.excerpt,
            }}
          />
        ))}
      </Div>
    )
  })
}

EventsByMonth.propTypes = {
  eventsByMonth: PropTypes.object.isRequired,
}

export default EventsByMonth
