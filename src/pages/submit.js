import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SubmitEvent from '../components/SubmitEvent'

class Submit extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        description={siteDescription}
      >
        <SEO
          title="Submit New Event"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <SubmitEvent />
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
  }
`
