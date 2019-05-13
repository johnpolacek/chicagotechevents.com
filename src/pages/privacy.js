import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Wrapper from '../components/Wrapper'

class Privacy extends React.Component {
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
          title={siteTitle + ' Privacy Policy'}
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <Wrapper fontSize="80%">
          <h2>Privacy Policy</h2>
          <p>
            <em>Updated April 27, 2019</em>
          </p>
          <p>
            If you require more information or have questions about this privacy
            policy, contact us by email at chicagotechevents@gmail.com
          </p>
          <h4>Affiliate Programs</h4>
          <p>
            Chicago Tech Events is an affiliate of Eventbrite. We are
            compensated for Eventbrite ticket sales generated when a user visits
            an Eventbrite site from a Chicago Tech Events referral link.
          </p>
          <h4>Email Newsletter</h4>
          <p>
            If you join our email list by registering for the Chicago Tech
            Events newsletter, we will have a record of your email address and
            other information you choose to provide. Chicago Tech Events will
            not share your email address or other information with outside
            parties, with the exception of Mailchimp, our email service
            provider.
          </p>
          <h4>Event Submissions</h4>
          <p>
            When Privacyting an event, the information provided will be posted
            in markdown format and will be publicly available on the website and
            in the source code which has been published as open source on
            Github.
          </p>
          <h4>Persons Under 18 Years of Age</h4>
          <p>
            Chicago Tech Events content and services are generally designed for
            persons of ages 18 and older, and not intended for use by children
            under 13. Chicago Tech Events does not knowingly collect personal
            information from anyone younger than 13.
          </p>
        </Wrapper>
      </Layout>
    )
  }
}

export default Privacy

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
