import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from '../layout/Wrapper'
import MonthHeader from '../ui/header/MonthHeader'
import Event from './Event'
import SponsorAd from '../sponsor/SponsorAd'
import SponsorPromo from '../sponsor/SponsorPromo'

const EventsByMonth = props => {
  return Object.keys(props.eventsByMonth).map(month => {
    return (
      <Wrapper key={month}>
        <MonthHeader month={month} />
        {
          props.eventsByMonth[month].map(({ node }, i, events) => (
          <React.Fragment key={node.fields.slug}>
            {
              i === 2 &&
              <>
                {
                  props.sponsor ? (
                    <SponsorAd sponsor={props.sponsor} />
                  ) : (
                    <SponsorPromo />
                  )
                }
              </>
            }
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
                isLast: i === events.length - 1,
              }}
            />
          </React.Fragment>
        ))}
      </Wrapper>
    )
  })
}

EventsByMonth.propTypes = {
  eventsByMonth: PropTypes.object.isRequired,
}

export default EventsByMonth
