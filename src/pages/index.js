import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  // const data = this.props.data
  
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Posts</h1>
        {data.allInstaNode.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.id}>
              <h2>{node.timestamp}</h2>
            </Link>
            <p>{node.caption}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allInstaNode {
      edges {
        node {
          id
          timestamp
          caption
          localFile {
            childImageSharp {
              fixed {
                src
                srcSet
              }
            }
          }
        }
      }
    }
  }
`