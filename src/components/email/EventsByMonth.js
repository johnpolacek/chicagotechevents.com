import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../theme'
import Event from './Event'

const StarIcon = () => <img alt="Chicago Star Icon" width="16px" height="16px" src="https://chicagotechevents.netlify.com/img/chicago-star.png" />

const EventsByMonth = props => {
  return Object.keys(props.eventsByMonth).map(month => {
    return (
      <div key={month} style={{ zIndex: '999' }}>
        <div style={{
          borderTop: 'solid 1px '+theme.colors.cyan, 
          borderBottom: 'solid 1px '+theme.colors.cyan,
          paddingTop: '2px'
        }}>
          <table style={{width:'100%'}}>
            <tr>
              <td style={{width:'33%',textAlign:'right', paddingTop:'3px'}}><StarIcon /></td>
              <td style={{textAlign:'center', color: theme.colors.red, fontWeight:'bold', fontSize: '14px', }}>{month.toUpperCase()}</td>
              <td style={{width:'33%',textAlign:'left', paddingTop:'3px'}}><StarIcon /></td>
            </tr>
          </table>
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
