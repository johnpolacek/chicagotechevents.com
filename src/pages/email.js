import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../theme.js'
import EmailHeader from '../components/email/Header'
import EventsByMonth from '../components/email/EventsByMonth'

class Email extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const events = data.allMarkdownRemark.edges
    const currEvents = events.filter(
      ({ node }) => new Date(node.frontmatter.endDate) >= new Date()
    )
    const eventsByMonth = {}
    currEvents.forEach(({ node }) => {
      const month =
        node.frontmatter.startDate.split(' ')[0] +
        ' ' +
        node.frontmatter.startDate.split(' ')[2]
      if (typeof eventsByMonth[month] === 'undefined') {
        eventsByMonth[month] = [{ node }]
      } else {
        eventsByMonth[month].push({ node })
      }
    })

    return (
      <ThemeProvider theme={theme}>
        <div style={{background:theme.colors.lite, fontFamily:theme.font, paddingBottom:'32px'}}>
          <EmailHeader title={siteTitle} />
          <p style={{ paddingBottom: '0', textAlign: 'center' }}>View these events online at <a style={{ fontSize:'18px' }} href="https://chicagotechevents.com">chicagotechevents.com</a></p>
          <p style={{ paddingBottom: '32px', textAlign: 'center', fontSize:'14px' }}><a href="*|UNSUB|*">Unsubscribe</a> to stop receiving updates</p>
          <div style={{ padding: '0 32px' }}>
            <EventsByMonth eventsByMonth={eventsByMonth} />
          </div>
        </div>
      </ThemeProvider>
    )
  }
}

export default Email

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___startDate], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            startDate(formatString: "MMMM DD, YYYY")
            startTime
            endDate(formatString: "MMMM DD, YYYY")
            endTime
            locationName
            locationStreet
            locationCity
            locationState
            cost
            eventUrl
          }
        }
      }
    }
  }
`
