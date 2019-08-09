const stripe = require('stripe')(process.env.STRIPE_SECRET);
const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET, 
  region: 'us-east-2'
})

const url = require('url')
const Octokit = require('@octokit/rest').plugin(require('./createPullRequest'))
const getSponsorMarkdown = require('./getSponsorMarkdown')

const octokit = new Octokit()
octokit.authenticate({
  type: 'oauth',
  token: process.env.GITHUB_TOKEN
})

const repo = 'chicagotechevents.com'
const owner = 'johnpolacek'

exports.handler = (event, context, callback) => {

  try {
  
    const submitData = JSON.parse(event.body)

    if (submitData.name && submitData.link && submitData.week && submitData.file && submitData.token) {

      stripe.charges.create({
        currency: 'usd',
        amount: 50,
        source: data.token.id,
        receipt_email: data.token.email,
        description: `Sponsorship Purchase`
      },
      (err, charge) => {
        if (err !== null) {
          console.log(err)
        }
        let status = charge === null || charge.status !== 'succeeded' ? 'failed' : charge.status
        callback(null, {
          statusCode,
          headers,
          body: JSON.stringify({ status }),
        })
      })


      // const srcData = Buffer.from(submitData.file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      // const sponsorId = submitData.week + '-' + submitData.name.replace(/\s+/g, '-').toLowerCase().replace(/[^0-9a-z]/gi, '')
      // const filename = sponsorId+'.md'
      // const filepath = 'content/eventslist/'+filename

      // const newContent = getSponsorMarkdown({
      //   id: sponsorId,
      //   name: submitData.name, 
      //   week: submitData.week, 
      //   link: submitData.link
      // })

      // const params = {
      //   Bucket: 'docqet-images',
      //   Key: 'sponsors/'+sponsorId+'.jpg',
      //   ContentType: 'image/jpeg',
      //   Body: srcData
      // }
    
      // s3.putObject(params, function(err, data) {
      //   if (err) {
      //     return callback(null, {
      //       statusCode: 500,
      //       body: JSON.stringify({ srcData: srcData, message: `putObject Error: Could not upload image`, error: err })
      //     })
      //   } else {
      //     octokit.createPullRequest({
      //       owner,
      //       repo,
      //       title: 'New Sponsor - '+submitData.name+' - '+submitData.week,
      //       body: 'New Sponsor - '+submitData.name+' - '+submitData.week,
      //       base: 'master',
      //       head: `pull-request-branch-name-${sponsorId}`,
      //       changes: {
      //         files: {[filepath]: newContent},
      //         commit: 'new sponsor - '+sponsorId
      //       }
      //     }).then((response) => {
      //       console.log('data', response.data)
      //       return callback(null, {
      //         statusCode: 200,
      //         body: JSON.stringify({
      //           message: `success`,
      //           sponsorId: sponsorId
      //         })
      //       })
      //     }).catch((e) => {
      //       console.log('error', e)
      //       if (e.status === 422) {
      //         console.log('BRANCH ALREADY EXISTS!')
      //         return callback(null, {
      //           statusCode: 400,
      //           body: JSON.stringify({
      //             error: `BRANCH ALREADY EXISTS!`})})
      //       }
      //     })
      //   }
      // })



    } else {
      return callback(null, {
        statusCode: 500,
        body: JSON.stringify({ message: `Missing required data` })
      })
    }    
  } catch (err) {
    return callback(null, {
      statusCode: 500,
      body: JSON.stringify({ message: `Could not upload image`, error: err })
    })
  }
}
