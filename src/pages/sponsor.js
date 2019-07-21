import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import SEO from '../components/seo'
import { Div, H2, P } from 'styled-system-html'
import SponsorCreate from '../components/sponsor/SponsorCreate'
import { getWeeksInYear } from '../components/util'

class Submit extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description

    const { edges } = this.props.data.allMarkdownRemark
    const sponsors = edges.filter(
      ({ node }) => node.frontmatter.sponsorDate
    )
    const sponsorDatesInUse = sponsors.map(sponsor => sponsor.node.frontmatter.sponsorDate)
    const sponsorDatesAvailable = getWeeksInYear().filter(week => !sponsorDatesInUse.includes(week))

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        description={siteDescription}
      >
        <SEO
          title="Sponsor"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <H2
          pb={4}
          color="base"
          fontWeight="bold"
          textAlign="center"
          position="relative"
          zIndex="99"
        >
          Sponsor
        </H2>
        <Div textAlign="center" pb={5} px={3}>
          <P mb={1}>Want to promote your product, service or event to hundreds of Chicago Tech Enthusiasts?</P>
          <P fontWeight="bold">Become a Chicago Tech Events sponsor!</P>
          <SponsorCreate weeksAvailable={sponsorDatesAvailable} />
        </Div>
      </Layout>
    )
  }
}

export default Submit

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
