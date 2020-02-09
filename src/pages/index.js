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
      <h1>Posts</h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap'
        }}
      >
        {data.allInstaNode.edges.map(({ node }) => {
          const image = node.localFile.childImageSharp

          return (
            <div
              key={node.id}
              style={{
                width: '100%',
                maxWidth: '33%',
                // flex: 1
              }}
            >
              <Link to={node.id}>
                <picture>
                      <source
                          type="image/jpg"
                          sizes={image.sizes.sizes}
                          srcSet={image.sizes.srcSet}
                      />
                      <source
                          type="image/webp"
                          sizes={image.sizes.sizes}
                          srcSet={image.sizes.srcSetWebp}
                      />
                      <img
                          src={image.sizes.src}
                          style={{width: '100%'}}
                          alt='Instagram Meme'
                      />
                  </picture>
              </Link>
            </div>
          )
        })}
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
              sizes {
                srcSet
                src
                srcSetWebp
                srcWebp
                sizes
              }
            }
          }
        }
      }
    }
  }
`