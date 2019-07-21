import React from 'react'
import { Div, H3, H4, H5, Img, P } from 'styled-system-html'
import SponsorAdForm from './SponsorAdForm'
import Event from '../events/Event'

const SponsorAdCreate = props => (
  <>
    <H3 fontWeight="300" color="blue" fontSize={4} pb={4}>CREATE AD</H3>
    <Div px={[0,0,0,3]} display="flex" flexWrap="wrap">
      <Div width={1/3} bg="white">
        <SponsorAdForm />
      </Div>
      <Div width={2/3} py={3} px={4} bg="gray2" textAlign="left">
        <H4 pb={3} color="gray8" fontSize={0} fontWeight="300">PREVIEW</H4>
        <H5 pb={2}>Events Website</H5>
        <P>The Sponsor Ad Image will appear between...</P>
        <Div p={4} bg="gray0">
          <Event
              {...{
                title: 'An Awesome Event',
                startDate: 'Start Date',
                startTime: 'Start Time',
                endDate: 'End Date',
                endTime: 'End Time',
                locationName: '1871',
                locationStreet: '222 Merchandise Mart',
                locationCity: 'Chicago',
                locationState: 'IL',
                cost: 'FREE',
                eventUrl: 'https://chicagotechevents.com',
                content: 'This is a placeholder event to show you how your sponsor ad will look on the website',
                isLast: true
              }}
            />
          <Div><Img width="100%" src="/img/sponsor-placeholder.gif" /></Div>
          <Event
              {...{
                title: 'Another Awesome Event',
                startDate: 'Start Date',
                startTime: 'Start Time',
                endDate: 'End Date',
                endTime: 'End Time',
                locationName: '1871',
                locationStreet: '222 Merchandise Mart',
                locationCity: 'Chicago',
                locationState: 'IL',
                cost: 'FREE',
                eventUrl: 'https://chicagotechevents.com',
                content: 'This is a placeholder event to show you how your sponsor ad will look on the website',
                isLast: true
              }}
            />
        </Div>
      </Div>
    </Div>
  </>
)

export default SponsorAdCreate
