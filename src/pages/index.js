import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import MonthHeader from "../components/MonthHeader"
import Event from "../components/Event"
import { Div } from "styled-system-html"

class Index extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const events = data.allMarkdownRemark.edges
    const eventsByMonth = {}
    events.forEach(({ node }) => {
      const month =
        node.frontmatter.startDate.split(" ")[0] +
        " " +
        node.frontmatter.startDate.split(" ")[2]
      if (typeof eventsByMonth[month] === "undefined") {
        eventsByMonth[month] = [{ node }]
      } else {
        eventsByMonth[month].push({ node })
      }
    })

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        description={siteDescription}
      >
        <SEO
          title="All Events"
          keywords={[`events`, `calendar`, `gatsby`, `javascript`, `react`]}
        />
        {Object.keys(eventsByMonth).map(month => {
          return (
            <Div key={month} pb={4}>
              <MonthHeader month={month} />
              {eventsByMonth[month].map(({ node }) => (
                <Event
                  {...{
                    url: node.fields.slug,
                    title: node.frontmatter.title || node.fields.slug,
                    startDate: node.frontmatter.startDate,
                    startTime: node.frontmatter.startTime,
                    endDate: node.frontmatter.endDate,
                    endTime: node.frontmatter.endTime,
                    locationName: node.frontmatter.locationName,
                    locationStreet: node.frontmatter.locationStreet,
                    locationCity: node.frontmatter.locationCity,
                    locationState: node.frontmatter.locationState,
                    cost: node.frontmatter.cost,
                    eventUrl: node.frontmatter.eventUrl,
                    content: node.frontmatter.description || node.excerpt,
                  }}
                />
              ))}
            </Div>
          )
        })}
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
