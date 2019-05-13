import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import AdminView from '../components/AdminView'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = { signedIn: false }
  }

  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Admin"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
          meta={[
            {
              name: `robots`,
              content: `noindex`,
            },
          ]}
        />
        <Wrapper>
          <AdminView />
        </Wrapper>
      </Layout>
    )
  }
}

export default Admin

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
