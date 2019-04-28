import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../theme'
import Event from './Event'

const EventsByMonth = props => {
  return Object.keys(props.eventsByMonth).map(month => {
    return (
      <div key={month} style={{ zIndex: '999' }}>
        <div style={{
          textAlign:'center', 
          color: theme.colors.red, 
          fontWeight:'bold', 
          fontSize: '14px', 
          borderTop: 'solid 1px '+theme.colors.cyan, 
          borderBottom: 'solid 1px '+theme.colors.cyan,
          padding: '4px 0 px',
          margin: '8px 0 32px'
        }}>
          <img alt="Chicago Star Icon" style={{margin: '0 4px', position: 'relative', top: '4px'}} width="16px" height="16px" src="/img/chicago-star.svg" />
          <span style={{margin: '0 8px', position:'relative', top:'1px'}}>
            {month.toUpperCase()}
          </span>
          <img alt="Chicago Star Icon" style={{margin: '0 4px', position: 'relative', top: '4px'}} width="16px" height="16px" src="/img/chicago-star.svg" />
        </div>
        {props.eventsByMonth[month].map(({ node }, i, events) => (
          <Event
            {...{
              key: node.fields.slug,
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
        ))}
      </div>
    )
  })
}

EventsByMonth.propTypes = {
  eventsByMonth: PropTypes.object.isRequired,
}

export default EventsByMonth
