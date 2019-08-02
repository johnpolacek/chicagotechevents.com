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

    if (typeof(submitData.name !== 'undefined') && typeof(submitData.link !== 'undefined') && typeof(submitData.week !== 'undefined') && typeof(submitData.file !== 'undefined')) {
      const srcData = Buffer.from(submitData.file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      const sponsorId = submitData.week + '-' + submitData.name.replace(/\s+/g, '-').toLowerCase().replace(/[^0-9a-z]/gi, '')

      const newContent = getSponsorMarkdown({
        id: sponsorId,
        name: submitData.name, 
        week: submitData.week, 
        link: submitData.link
      })

      const params = {
        Bucket: 'docqet-images',
        Key: 'sponsors/'+sponsorId+'.jpg',
        ContentType: 'image/jpeg',
        Body: srcData
      }
    
      s3.putObject(params, function(err, data) {
        if (err) {
          return callback(null, {
            statusCode: 500,
            body: JSON.stringify({ srcData: srcData, message: `putObject Error: Could not upload image`, error: err })
          })
        } else {
          return callback(null, {
            statusCode: 200,
            body: JSON.stringify({ message: `success` })
          })
        }
      })
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
