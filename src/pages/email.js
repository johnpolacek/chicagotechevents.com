import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import theme from '../theme.js'
import { getMonday } from '../components/util'
import Header from '../components/email/Header'
import EventsByMonth from '../components/email/EventsByMonth'
import SponsorAd from '../components/email/SponsorAd'

class Email extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const { edges } = this.props.data.allMarkdownRemark
    const events = edges.filter(({ node }) => node.frontmatter.startDate)
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

    const monday = getMonday()
    const nextMonday = getMonday(1)
    const sponsors = edges.filter(({ node }) => {
      const sponsorDate = new Date(node.frontmatter.sponsorDate)
      if (node.frontmatter.sponsorDate) {
        return sponsorDate >= monday && sponsorDate < nextMonday
      } else {
        return false
      }
    })
    let sponsor = null
    if (sponsors.length !== 0) {
      sponsor = sponsors[0].node.frontmatter
      sponsor.id = sponsors[0].node.fields.slug.split('/')[2]
    }
    console.log('sponsor',sponsor)

    return (
      <ThemeProvider theme={theme}>
        <table
          id="emailTemplate"
          cellPadding="0"
          style={{
            background: '#fff',
            fontFamily: theme.font,
            paddingBottom: '32px',
            borderCollapse: 'collapse',
          }}
        >
          <Header title={siteTitle} />
          <tbody>
            <tr>
              <td style={{ padding: '16px 0 24px', textAlign: 'center' }}>
                View these events online at{' '}
                <a
                  style={{ color: theme.colors.blue, fontSize: '18px' }}
                  href="https://chicagotechevents.com"
                >
                  chicagotechevents.com
                </a>
              </td>
            </tr>
            <tr>
              <td>
                {sponsor ? (
                  <SponsorAd sponsor={sponsor} />
                ) : (
                  <>
                    <p style={{textAlign: 'center' }}>
                      Want to sponsor this newsletter and reach hundreds of Chicago tech enthusiasts? Go to <a href="https://chicagotechevents.com/sponsor">chicagotechevents.com/sponsor</a>
                    </p>
                  </>
                )}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  paddingTop: '24px',
                  paddingBottom: '36px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                <a style={{ color: theme.colors.blue }} href="*|UNSUB|*">
                  Unsubscribe
                </a>{' '}
                to stop receiving updates
              </td>
            </tr>
            <EventsByMonth sponsor={sponsor} eventsByMonth={eventsByMonth} />
          </tbody>
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
            sponsorDate
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
