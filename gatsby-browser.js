/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import 'lazysizes'
import 'lazysizes/plugins/attrchange/ls.attrchange'
import getFacebookSdk from './src/helpers/facebook-sdk'

export const onRouteUpdate =  async () => {
    const FB = await getFacebookSdk()
    FB.AppEvents.logPageView()
}