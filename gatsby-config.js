module.exports = {
  siteMetadata: {
    title: `Chicago Tech Events`,
    author: `John Polacek`,
    description: `The best web, tech and startup events in Chicago`,
    siteUrl: `https://chicagotechevents.netlify.com/`,
    social: {
      twitter: `chicagotechevents`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/eventslist`,
        name: `eventslist`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`
    },
    {
      resolve: `gatsby-plugin-sharp`
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chicago Tech Events`,
        short_name: `ChicagoTechEvents`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/calendar-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`
    },
    {
      resolve: `gatsby-plugin-react-helmet`
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
  ],
}
