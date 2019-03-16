import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Div, H2, H3, P } from 'styled-system-html'

const toAmPm = (time) => (parseInt(time.split(':')[0]) % 12 + (time.split(':')[1] !== '00' && (':'+time.split(':')[1])) + (parseInt(time.split(':')[0]) < 12 ? 'am' : 'pm'))

const Event = (props) => (
	<Div key={props.url} pb={4}>
    {
      props.url ? (
        <H3 fontSize={4} borderBottom="solid 1px" borderColor="gray2" mb={1}>
          <Link to={props.url}>
            {props.title}
          </Link>
        </H3>
      ) : (
        <H2 color="base" fontSize={4} borderBottom="solid 1px" borderColor="gray2" mb={1}>{props.title}</H2>
      )
    }
    <P color="gray7" fontStyle="italic" fontSize={0} mb={2}>{props.date}{props.timestart ? ' – '+toAmPm(props.timestart) : ''}{props.timeend && props.timeend ? ' to '+toAmPm(props.timeend) : ''}</P>
    <P mb={3}
      dangerouslySetInnerHTML={{
        __html: props.content,
      }}
    />
    <P fontSize={0} mb={2} lineHeight="1.2">
      {props.locationName}<br/>
      {props.locationAddress}<br/>
      {props.locationCity}, {props.locationState}<br/>
    </P>
    <P fontSize={0} mb={1}>Cost: {props.cost}</P>
    <P fontSize={0} mb={1} fontWeight="bold">Go to event: <a href={props.eventUrl}>{props.eventUrl.replace('https://','').replace('http://','').replace('www.','')}</a></P>
  </Div>
)

Event.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timestart: PropTypes.string,
  timeend: PropTypes.string,
  locationName: PropTypes.string.isRequired,
  locationAddress: PropTypes.string.isRequired,
  locationCity: PropTypes.string.isRequired,
  locationState: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  eventUrl: PropTypes.string.isRequired,
}

export default Event
