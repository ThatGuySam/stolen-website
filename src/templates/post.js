import React, { Component } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Layout from "../components/layout"
import SEO from "../components/seo"

class Post extends Component {
  render() {
    const post = this.props.data.instaNode

    const image = post.localFile.childImageSharp.fixed

    console.log('post', post)

    return (
        <Layout>
            <SEO title="Home" />
            <div>
                <img
                    src={image.src}
                />
                <h1>{post.likes}</h1>
                <div>{post.caption}</div>
            </div>
        </Layout>
    )
  }
}

Post.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Post

export const postQuery = graphql`
  query($id: String!) {
    instaNode(id: { eq: $id }) {
        likes
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
    }
    site {
        siteMetadata {
            title
        }
    }
  }
`
