import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import EventsByMonth from '../components/EventsByMonth'
import { Div } from 'styled-system-html'

class Past extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const events = data.allMarkdownRemark.edges
    const currEvents = events.filter(
      ({ node }) => new Date(node.frontmatter.endDate) < new Date()
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
      <Layout
        location={this.props.location}
        title={siteTitle}
        description={siteDescription}
      >
        <SEO
          title="Events"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <EventsByMonth eventsByMonth={eventsByMonth} />
        {currEvents < events && (
          <Div textAlign="center" pb={4} mb={3}>
            <Link to={`/`}>view current events »</Link>
          </Div>
        )}
      </Layout>
    )
  }
}

export default Past

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
