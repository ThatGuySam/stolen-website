require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Stolen Dank Christian Memes`,
    description: `Christian Memes stolen from Reddit and shoehorned sponsored posts. All content is stolen and not at all original. `,
    author: `@stolendankchristianmemes`,
  },
  plugins: [
    
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-sharp`,

    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `stolendankchristianmemes`,
        access_token: process.env.GRAPH_API_TOKEN,
        instagram_id: process.env.INSTAGRAM_BUSINESS_ID,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `stolen-dank-christian-memes`,
        short_name: `stolen`,
        start_url: `/`,
        background_color: `#ff4500`,
        theme_color: `#ff4500`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
