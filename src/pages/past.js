import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout/Layout'
import SEO from '../components/seo'
import EventsByMonth from '../components/events/EventsByMonth'
import LinkButton from '../components/ui/LinkButton'
import { Div, H2 } from 'styled-system-html'

class Past extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description

    // filter out sponsors
    const events = data.allMarkdownRemark.edges.filter(
      ({ node }) => node.frontmatter.startDate
    )
    const pastEvents = events.filter(
      ({ node }) => new Date(node.frontmatter.endDate) < new Date()
    )
    const eventsByMonth = {}
    pastEvents.forEach(({ node }) => {
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
        <Div textAlign="center" mt={-5} pb={4}>
          <H2 pb={4} fontSize={5} fontWeight="normal" color="base">
            Past Events
          </H2>
          <Link style={{ textDecoration: 'none' }} to={`/`}>
            <LinkButton fontWeight={1}>VIEW CURRENT EVENTS</LinkButton>
          </Link>
        </Div>
        <EventsByMonth eventsByMonth={eventsByMonth} />
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
