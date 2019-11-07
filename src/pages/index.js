import React from 'react'
import { graphql, Link } from 'gatsby'
import { getMonday } from '../components/util'
import Layout from '../components/layout/Layout'
import { Div } from 'styled-system-html'
import SEO from '../components/seo'
import Subscribe from '../components/forms/Subscribe'
import EventsByMonth from '../components/events/EventsByMonth'
import LinkButton from '../components/ui/LinkButton'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description

    const { edges } = this.props.data.allMarkdownRemark
    const events = edges.filter(({ node }) => node.frontmatter.startDate)

    const today = new Date()
    today.setHours(0,0,0,0)

    const currEvents = events.filter(
      ({ node }) => new Date(node.frontmatter.endDate) >= today
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

    const monday = getMonday(-1)
    const nextMonday = getMonday(0)
    const sponsors = edges.filter(({ node }) => {
      let sponsorDate = new Date(node.frontmatter.sponsorDate)
      sponsorDate.setDate(sponsorDate.getDate() + 1)
      if (node.frontmatter.sponsorDate) {
        return sponsorDate >= monday && sponsorDate < nextMonday
      } else {
        return false
      }
    })
    console.log('sponsors',sponsors)
    let sponsor = null
    if (sponsors.length !== 0) {
      sponsor = sponsors[0].node.frontmatter
      sponsor.id = sponsors[0].node.fields.slug.split('/')[1]
    }

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
        <Subscribe />
        <EventsByMonth sponsor={sponsor} eventsByMonth={eventsByMonth} />
        {currEvents < events && (
          <Div textAlign="center" pb={4} mb={3}>
            <Link style={{ textDecoration: 'none' }} to={`/past`}>
              <LinkButton fontSize={2}>VIEW PAST EVENTS</LinkButton>
            </Link>
          </Div>
        )}
      </Layout>
    )
  }
}

export default Index

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
