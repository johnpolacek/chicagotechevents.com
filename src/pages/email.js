import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../theme.js'
import Header from '../components/email/Header'
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
        <table id="emailTemplate" cellpadding="0" style={{background:'#fff', fontFamily:theme.font, paddingBottom:'32px', borderCollapse: 'collapse'}}>
          <Header title={siteTitle} />
          <tr>
            <td style={{ padding: '16px 0 24px', textAlign: 'center' }}>
              View these events online at <a style={{ color: theme.colors.blue, fontSize:'18px' }} href="https://chicagotechevents.com">chicagotechevents.com</a>
            </td>
          </tr>
          <tr>
            <td style={{ paddingBottom: '48px', textAlign: 'center', fontSize:'14px' }}>
              <a style={{color: theme.colors.blue}} href="*|UNSUB|*">Unsubscribe</a> to stop receiving updates
            </td>
          </tr>
          <EventsByMonth eventsByMonth={eventsByMonth} />
        </table>
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
