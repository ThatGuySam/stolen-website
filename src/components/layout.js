/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 600,
          padding: `0 1.0875rem 1.45rem`,
          minHeight: '75vh'
        }}
      >
        <main>{children}</main>
        <div>
          <Link to='/'>
            <div style={{padding: `1.45rem 0 1.45rem`,}}>
              <strong>Home</strong>
            </div>
          </Link>
        </div>
        <footer
          style={{
            paddingTop: '45px',
            paddingBottom: '45px',
          }}
        >
          © {new Date().getFullYear()}, Built with Memes
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
