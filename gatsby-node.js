/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const slash = require(`slash`)

// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // The “graphql” function allows us to run arbitrary
    // queries against the local Gatsby GraphQL schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // Image Fragments
    // https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L6
    const result = await graphql(`
        {
            allInstaNode {
                edges {
                    node {
                        id
                        username
                        likes
                        comments
                        caption
                        localFile {
                            childImageSharp {
                                fixed {
                                    width
                                    height
                                    src
                                    srcSet
                                }
                            }
                        }
                        mediaType
                        original
                        timestamp
                        dimensions {
                            height
                            width
                        }
                    }
                }
            }
        }
    `)

    // Check for any errors
    if (result.errors) {
        console.error(result.errors)
    }

    // Access query results via object destructuring
    const { allInstaNode } = result.data

    const postTemplate = path.resolve(`./src/templates/post.js`)

    // We want to create a detailed page for each
    // instaNode. We'll just use the instaNode id for the slug.
    // The Page ID is prefixed with 'PAGE_'
    allInstaNode.edges.forEach(edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${edge.node.id}/`,
            component: slash(postTemplate),
            context: {
                id: edge.node.id,
            },
        })
    })

}
