import React from 'react'
import PropTypes from 'prop-types'
import theme from '../../theme'
import { getEventDateString } from '../util'

const Event = props => (
  <tr>
    <td colSpan="3" key={props.url} style={{padding: '16px 0 32px', marginBottom: '32px', borderBottom: props.isLast ? 'none' : 'solid 1px #ccc' }}>
      <h2 style={{ color: theme.colors.base, fontSize: '30px'}}>{props.title}</h2>
      <p style={{ color: theme.colors.red, fontStyle:"italic", fontWeight:"bold", fontSize: '14px', marginBottom: '8px'}}>
        {getEventDateString(
          props.startDate,
          props.startTime,
          props.endDate,
          props.endTime
        )}
      </p>
      <p style={{ fontSize:'16px', marginBottom:'16px' }} dangerouslySetInnerHTML={{__html: props.content}} />
      <p style={{ fontSize:'14px', marginBottom:'16px', fontWeight:'600', lineHeight: '1.4', fontStyle: 'italic' }}>
        <span>{props.locationName}</span>
        <br />
        {props.locationStreet}
        <br />
        {props.locationCity}, {props.locationState}
        <br />
      </p>
      <p style={{ color: theme.colors.gray8, fontWeight:"600", fontSize: '14px', marginBottom: '8px' }}>
        Cost: {props.cost}
      </p>
      <p style={{ fontWeight:"bold", fontSize: '14px', marginBottom: '8px' }}>
        Go to event:{' '}
        <a style={{ fontWeight:"bold", marginLeft: '4px' }} href={props.eventUrl}>
          {props.eventUrl
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace(/\/$/, '')}
        </a>
      </p>
    </td>
  </tr>
)

Event.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  startTime: PropTypes.string,
  endDate: PropTypes.string,
  endTime: PropTypes.string,
  locationName: PropTypes.string.isRequired,
  locationStreet: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
  isLast: PropTypes.bool,
}

export default Event
