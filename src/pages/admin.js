import React from 'react'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout/Layout'
import Wrapper from '../components/layout/Wrapper'
import AdminView from '../components/admin/View'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = { signedIn: false }
  }

  render() {

    if (typeof window !== 'undefined' && window.location.hash === '') {
      window.location.href = 'https://secure.meetup.com/oauth2/authorize?client_id=ch3hjqgh7nh72u5o72fdkkbeh6%20&response_type=token&redirect_uri=https%3A%2F%2Fchicagotechevents.com%2Fadmin'
    }

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
