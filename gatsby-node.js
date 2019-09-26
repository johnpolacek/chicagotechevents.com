const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const eventListing = path.resolve(`./src/templates/event-listing.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___startDate], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create events pages.
    const events = result.data.allMarkdownRemark.edges.filter(event => { return typeof(event.node.fields) !== 'undefined' && typeof(event.node.fields.slug) !== 'undefined' && !event.node.fields.slug.includes('/sponsors/') })

    events.forEach((event, index) => {
      const previous = index === events.length - 1 ? null : events[index + 1].node
      const next = index === 0 ? null : events[index - 1].node

      createPage({
        path: event.node.fields.slug,
        component: eventListing,
        context: {
          slug: event.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
