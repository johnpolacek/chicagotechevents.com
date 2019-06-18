import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import SEO from '../components/seo'
import { Div, H2 } from 'styled-system-html'

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
          title="Sponsor"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <H2
          pb={4}
          mb={3}
          color="base"
          fontWeight="bold"
          textAlign="center"
          position="relative"
          zIndex="99"
        >
          Sponsor
        </H2>
        <Div textAlign="center" pb={5}>
          Become a {siteTitle} sponsor...
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
  }
`
