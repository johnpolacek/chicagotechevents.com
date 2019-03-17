import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import MonthHeader from '../components/MonthHeader'
import Event from '../components/Event'
import { Div } from 'styled-system-html'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const events = data.allMarkdownRemark.edges
    const eventsByMonth = {}
    events.forEach(({ node }) => {
      const month = node.frontmatter.date.split(' ')[0]+' '+node.frontmatter.date.split(' ')[2]
      if (typeof(eventsByMonth[month]) === 'undefined') {
        eventsByMonth[month] = [{node}]
      } else {
        eventsByMonth[month].push({node})
      }
    })

    return (
      <Layout location={this.props.location} title={siteTitle} description={siteDescription}>
        <SEO
          title="All Events"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        {
          Object.keys(eventsByMonth).map((month) => {
            return (
              <Div key={month} pb={4}>
                <MonthHeader month={month} />
                {
                  eventsByMonth[month].map(({node}) => (
                    <Event {...{
                      url:              node.fields.slug,
                      title:            node.frontmatter.title || node.fields.slug,
                      date:             node.frontmatter.date,
                      timestart:        node.frontmatter.timestart,
                      timeend:          node.frontmatter.timeend,
                      locationName:     node.frontmatter.locationName,
                      locationAddress:  node.frontmatter.locationAddress,
                      locationCity:     node.frontmatter.locationCity,
                      locationState:    node.frontmatter.locationState,
                      cost:             node.frontmatter.cost,
                      eventUrl:         node.frontmatter.eventUrl,
                      content:          node.frontmatter.description || node.excerpt,
                    }} />
                  ))
                }
              </Div>
            )
          })
        }
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
