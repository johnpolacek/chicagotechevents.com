import React, { useState } from 'react'
import useSponsorData from './useSponsorData'
import { Div, H4, Img, P, A, Span } from 'styled-system-html'
import TabButton from '../ui/TabButton'
import Event from '../events/Event'
import Header from '../email/Header'

const SponsorAdPreview = props => {
  const PREVIEW_NEWSLETTER = 'PREVIEW_NEWSLETTER'
  const PREVIEW_SITE = 'PREVIEW_SITE'
  const PREVIEW_SOCIAL = 'PREVIEW_SOCIAL'
  const [preview, setPreview] = useState(PREVIEW_NEWSLETTER)

  const { 
    sponsorName, sponsorLink, sponsorImageUpload } = useSponsorData();

  return (
    <Div id="sponsorPreview">
      <H4 textAlign="right" pb={3} pr={1} color="gray8" fontSize={0}>PREVIEW</H4>

      <TabButton isActive={preview === PREVIEW_NEWSLETTER} onClick={() => setPreview(PREVIEW_NEWSLETTER)}>Newsletter</TabButton>
      <TabButton isActive={preview === PREVIEW_SITE} onClick={() => setPreview(PREVIEW_SITE)}>Website</TabButton>
      <TabButton isActive={preview === PREVIEW_SOCIAL} onClick={() => setPreview(PREVIEW_SOCIAL)}>Social</TabButton>
      <Div bg="gray0" p={4}>
        {
          {
            [PREVIEW_SITE]: (
              <Div id="previewSite">
                <P fontSize={1}>On <A href="https://chicagotechevents.com" target="_blank">chicagotechevents.com</A>, the Sponsor Ad Image will appear after the 2nd event for each month with at least 2 events listed on the calendar.</P>
                <Div pt={4} px={4} bg="white" border="1px solid" borderColor="rgba(0,0,0,.1)">
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
                  <Div position="relative" top="-40px" mb={-3} textAlign="center">
                    <P pb={0} mb={1} fontStyle="italic" fontSize={0} color="gray">Thank you to <A href={sponsorLink}>{sponsorName === '' ? '[Sponsor Name]' : sponsorName}</A> for being this week’s sponsor.</P>
                    <A id="sponsorImageLink" href={sponsorLink} target="_blank" onClick={e => { if (sponsorLink === '') e.preventDefault()}}>
                      {sponsorImageUpload && sponsorImageUpload.data ?
                          (
                            <Img id="sponsorImagePreviewSite" width={1} height="auto" src={sponsorImageUpload.data} />
                          ) : (
                            <Img width={1} height="auto" src="/img/sponsor-placeholder.gif" />
                          )
                        }
                    </A>
                  </Div>
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
            ),
            [PREVIEW_NEWSLETTER]: (
              <Div id="previewNewsletter">
                <P fontSize={1}>The Sponsor Ad Image and Thank You For Sponsoring message appear at the top of the newsletter.</P>
                <Div pt={4} px={4} bg="white" border="1px solid" borderColor="rgba(0,0,0,.1)">
                  <Header title="CHICAGO TECH EVENTS" />
                  <Div position="relative" px={3} pb={4} textAlign="center">
                    <P pb={0} mb={1} fontStyle="italic" fontSize={0} color="gray">Thank you to <A href={sponsorLink}>{sponsorName === '' ? '[Sponsor Name]' : sponsorName}</A> for sponsoring this newsletter</P>
                    <Div textAlign="center">
                      <A id="sponsorImageLink" href={sponsorLink} width={1} target="_blank" onClick={e => { if (sponsorLink === '') e.preventDefault()}}>
                        {sponsorImageUpload && sponsorImageUpload.data ?
                          (
                            <Img id="sponsorImagePreviewNewsletter" width={1} height="auto" src={sponsorImageUpload.data} />
                          ) : (
                            <Img width={1} height="auto" src="/img/sponsor-placeholder.gif" />
                          )
                        }
                      </A>
                    </Div>
                  </Div>
                </Div>
              </Div>
            ),
            [PREVIEW_SOCIAL]: (
              <Div id="previewSocial">
                <P fontSize={1}>A sponsorship announcement tweet will be sent out.</P>
                <Div pb={6} mb={6} bg="white" border="1px solid" borderColor="rgba(0,0,0,.1)">
                  <Div position="relative">
                    <Img width={1} src="/img/tweet.png" />
                    <P position="absolute" px={3} pb={5} textAlign="left" bg="white" fontSize="2.2vw" style={{top:'50%',lineHeight:1.4, fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif'}}>
                      <Span>Thanks to {sponsorName === '' ? '[Sponsor Name]' : sponsorName} for sponsoring this week’s Chicago Tech Events. Visit them at </Span>
                      <A fontWeight="400" href={sponsorLink} onClick={e => { if (sponsorLink === '') e.preventDefault()}}>{sponsorLink === '' ? '[Sponsor Link]' : sponsorLink}</A>
                    </P>
                  </Div>
                </Div>
              </Div>
            )
          }[preview]
        }
      </Div>
    </Div>
  )
}

export default SponsorAdPreview
