import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import SubmitEventForm from '../components/SubmitEventForm'

const onSubmit = (eventData) => {
  console.log('onSubmit',eventData)
  // saveEvent(eventData).then((response) => {
  //   console.log('response', response)
  // }).catch((e) => {
  //   console.log('response err', e)
  // })
}

const saveEvent = async event => {
    return fetch(`/.netlify/functions/add-event/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }).then(response => {
    console.log(response)
    return response.json()
  })
}

class Submit extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    return (
      <Layout location={this.props.location} title={siteTitle} description={siteDescription}>
        <SEO
          title="Submit New Event"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        <SubmitEventForm onSubmit={onSubmit} />
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
