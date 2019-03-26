# chicagotechevents.com

Forked from the [Gatsby Events List Starter](https://github.com/johnpolacek/gatsby-starter-events-list).

--

### Build Log

Use the Gatsby CLI to create a new events list from the starter.

~~~~
gatsby new my-events-list https://github.com/johnpolacek/gatsby-starter-events-list
cd my-events-list
npm run dev
~~~~

This basic events list is nice, but we want to be able to accept submissions. 

There is a nice example of doing this with Google Forms in the [Gatsby Event Calendar Starter](https://www.gatsbyjs.org/starters/EmaSuriano/gatsby-starter-event-calendar/). In that example, people submit events via the Google Form and the site updates as those events are added or updated.

In our case, we don’t want any old spammy event to get listed so let’s set up a review process where users can submit events, an admin can reject or approve. 

Reject or approve, what does that sound like? I’ll give you a hint—our starter will generate a new build every time one of these gets merged.

We are going to deploy and host our site on [Netlify](https://www.netlify.com/) and with [Netlify Functions](https://www.netlify.com/docs/functions/), we can create a Lambda endpoint that can issue a pull request to our project’s Github repository.

First, sign up for a Netlify Account and link it to your Github account. Add a new Github repo for the events list, and create a new Netlify site from the repo.

Next, sign up for a [Github Developer account](https://developer.github.com/) to get access to their API. 

Once you have an account and have added a Netlify app from your events list Github repository, you will need to [generate a token](https://github.com/settings/tokens/new) so the app can call the API. When you generate the token, copy it because it will not be able to see it again.

Go to your [Netlify App](https://app.netlify.com/sites/) and add the token as a Build Environment Variable in your app.


Add section about:
npm scripts that installs on the add-event dir then zips etc



https://github.com/DavidWells/functions-site




Let’s add a link to our header to a new page with an add event form.

*src/components/Header.js*

~~~~
<Header textAlign="center" pb={4} mb={2}>
  <H1 pb={2} mb={2}>{props.title}</H1>
  <H2 fontSize={2} fontWeight="normal" mb={4}>{props.description}</H2>
  <Link style={{textDecoration:'none'}} to={`/submit`}><Span bg="cyan" color="white" px={3} py={2} borderRadius="4px">Submit Event</Span></Link>
</Header>
~~~~   




Thanks to David Wells 

## Customize

Update the site title, description and more by editing `siteMetadata` in `gatsby-config.js`.

Change the font, colors and more by editing the settings in `src/theme.js`

Add events via markdown files in `/content/eventslist/`. Example markdown files have been provided.

## Deploy

~~~~
npm run build
~~~~

Publish the `public` directory to a webhost or deploy with [Netlify](https://www.netlify.com/docs/).

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/johnpolacek/gatsby-starter-events-list)


--

Calendar icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com/) is licensed by [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/).