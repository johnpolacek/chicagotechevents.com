import React, { useState } from 'react'
import { Div, H4, Img, P } from 'styled-system-html'
import TabButton from '../ui/TabButton'
import Event from '../events/Event'
import Header from '../email/Header'

const SponsorAdPreview = props => {
  const PREVIEW_NEWSLETTER = 'PREVIEW_NEWSLETTER'
  const PREVIEW_SITE = 'PREVIEW_SITE'
  const PREVIEW_SOCIAL = 'PREVIEW_SOCIAL'
  const [preview, setPreview] = useState(PREVIEW_NEWSLETTER)

  return (
    <>
      <H4 pb={3} color="gray8" fontSize={0} fontWeight="300">PREVIEW</H4>

      <TabButton isActive={preview === PREVIEW_NEWSLETTER} onClick={() => setPreview(PREVIEW_NEWSLETTER)}>Newsletter</TabButton>
      <TabButton isActive={preview === PREVIEW_SITE} onClick={() => setPreview(PREVIEW_SITE)}>Events Site</TabButton>
      <TabButton isActive={preview === PREVIEW_SOCIAL} onClick={() => setPreview(PREVIEW_SOCIAL)}>Social</TabButton>
      <Div bg="gray0" p={4}>
        {
          {
            [PREVIEW_SITE]: (
              <>
                <P fontSize={1}>The Sponsor Ad Image appears after the 2nd event and again every 10 events after that.</P>
                <Div pt={4} px={4} bg="white">
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
                  <Div position="relative" top="-40px" mb={-3}><Img width="100%" src="/img/sponsor-placeholder.gif" /></Div>
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
              </>
            ),
            [PREVIEW_NEWSLETTER]: (
              <>
                <P fontSize={1}>The Sponsor Ad Image and Thank You For Sponsoring message appear at the top of the newsletter.</P>
                <Div pt={4} px={4} bg="white">
                  <Header title="CHICAGO TECH EVENTS" />
                  <Div position="relative" px={3} pb={4} textAlign="center">
                    <P pb={0} mb={1} fontStyle="italic" fontSize={0} color="gray">Thank you to [Company Name] for sponsoring this newsletter</P>
                    <Img width={[1,'450px']} src="/img/sponsor-placeholder.gif" />
                  </Div>
                </Div>
              </>
            ),
            [PREVIEW_SOCIAL]: <Div py={6} textAlign="center">Twitter Preview</Div>
          }[preview]
        }
      </Div>
    </>
  )
}

export default SponsorAdPreview
