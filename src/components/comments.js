import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
import { Location } from '@reach/router'
// import Loadable from "@loadable/component"

// import getFacebookSdk from '../helpers/facebook-sdk'

function Comments () {

  return (
    <Location>
      {({ location }) => {
        return (
          <div
            className='fb-comments'
            data-href={location.href}
            data-width=''
            data-numposts='5'
          />
        )
      }}
    </Location>
  )
}

export default Comments
