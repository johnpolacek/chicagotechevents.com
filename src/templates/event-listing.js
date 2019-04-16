import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Event from "../components/Event"
import { Div, Nav, Span } from "styled-system-html"

class CalendarEventTemplate extends React.Component {
  render() {
    const node = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description
    const { previous, next } = this.props.pageContext

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        description={siteDescription}
      >
        <SEO
          title={node.frontmatter.title}
          description={node.frontmatter.description || node.excerpt}
        />
        <Event
          {...{
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
            content: node.html,
          }}
        />

        <Nav
          borderTop="solid 2px"
          borderColor="gray2"
          mt={3}
          py={3}
          display="flex"
        >
          <Div textAlign="left" width={1 / 2}>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <Span display="flex">
                  <Span pr={3}>←</Span>
                  <Span>{previous.frontmatter.title}</Span>
                </Span>
              </Link>
            )}
          </Div>
          <Div textAlign="right" width={1 / 2}>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <Span display="flex" justifyContent="flex-end">
                  <Span>{next.frontmatter.title}</Span>
                  <Span pl={3}>→</Span>
                </Span>
              </Link>
            )}
          </Div>
        </Nav>
      </Layout>
    )
  }
}

export default CalendarEventTemplate

export const pageQuery = graphql`
  query CalendarEventBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 480)
      html
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
`
