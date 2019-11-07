import React from 'react'
import { graphql, Link } from 'gatsby'
import { getMonday } from '../components/util'
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
    const { edges } = this.props.data.allMarkdownRemark
    const events = edges.filter(({ node }) => node.frontmatter.startDate)

    const monday = getMonday(-1)
    const nextMonday = getMonday(0)
    const sponsors = edges.filter(({ node }) => {
      let sponsorDate = new Date(node.frontmatter.sponsorDate)
      sponsorDate.setDate(sponsorDate.getDate() + 1)
      if (node.frontmatter.sponsorDate) {
        console.log('sponsorDate', sponsorDate)
        console.log('monday',monday)
        console.log('nextMonday',nextMonday)
        
        return sponsorDate >= monday && sponsorDate < nextMonday
      } else {
        return false
      }
    })
    let sponsor = null
    console.log(sponsors)
    if (sponsors.length !== 0) {
      sponsor = sponsors[0].node.frontmatter
      sponsor.id = sponsors[0].node.fields.slug.split('/')[1]
    }

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
        <EventsByMonth sponsor={sponsor} eventsByMonth={eventsByMonth} />
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
