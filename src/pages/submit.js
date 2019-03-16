import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import { Div } from 'styled-system-html'

class Submit extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    return (
      <Layout location={this.props.location} title={siteTitle} description={siteDescription}>
        <SEO
          title="All Events"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <Div py={4} mb={4} textAlign="center">Submit Event Form will go here...</Div>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            timestart
            timeend
            title
            locationName
            locationAddress
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
