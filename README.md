Monday AM - Ask David Wells about testing

Need to test the function separately on localhost:9000?



localhost not going to work because Github requires OAuth and opening it to localhost is baaad. Simulate somehow?

Trying to get local build to work. ZIP file is moved but not accessible to local. Need unzip and set up new route for localhost:9000 to connect to add-event

Currently manually unzipping file and set up a gatsby-config route just for add-event. Getting: Function invocation failed: Error: OAuth2 authentication requires a token or key & secret to be set




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

Next, we will create the function that makes it all happen. Easy to say, but it takes a few steps to get there.

To better understand what we are doing, take some time to read/review the following:

* [Lambda functions on Netlify](https://www.netlify.com/docs/functions/)
* [README for netlify-lambda](https://github.com/netlify/netlify-lambda)
* [Turning the Static Dynamic: Gatsby + Netlify Functions + Netlify Identity
](https://www.gatsbyjs.org/blog/2018-12-17-turning-the-static-dynamic/)

Ok, did you get all that? So you can build [Lambda functions](https://www.netlify.com/docs/functions/) that can be deployed on Netlify or served locally via [netlify-lambda](https://github.com/netlify/netlify-lambda). To access these functions in a local environment, you need to set up a proxy in your gatsby config. You’ll also have to set up npm scripts that make it all happen.

Let’s do it one step at a time. First, install the dependencies we need.

For running our functions locally on `localhost:9000`:

~~~~
npm i -D netlify-lambda
~~~~

For routing our `localhost:9000` api calls to a proxy that matches the production url of `/.netlify/functions/`:

~~~~
npm i -D http-proxy-middleware
~~~~

For running multiple npm-scripts sequentially:

~~~~
npm i -D npm-run-all
~~~~

Ok let’s write an `add-event` function that takes some parameters then builds a markdown file to be submitted as a pull request to our events site Github repository.

Wait. What? That’s a lot. I know, but let’s just keep going...

We need to make a whole package unto itself to do all that. Make a `/functions/add-event` directory.

~~~~
mkdir functions
mkdir functions/addevent
cd functions/addevent
npm init
~~~~

Follow along with the prompts to set up the npm package. You can hit enter a bunch of times to skip through - a `package.json` file will be generated that you can adjust later.

Next, iinstall the [GitHub REST API client](https://github.com/octokit/rest.js#readme).

~~~~
npm i @octokit/rest
~~~~



*functions/add-event/index.js*

~~~~
// code here
~~~~



All this is based on https://github.com/DavidWells/functions-site










https://github.com/sw-yx/jamstack-hackathon-starter



https://github.com/sidneyw/gatsby-starter-netlify-lambda





Add section about:
npm scripts that installs on the add-event dir then zips etc




How to test locally?
netlify-lambda serve <source-folder>
https://codeburst.io/write-and-deploy-your-first-serverless-function-within-10-minutes-or-less-d7552fcd6550
https://travishorn.com/netlify-lambda-functions-from-scratch-1186f61c659e

https://github.com/netlify/netlify-lambda


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