const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
})

exports.handler = async (event, context, callback) => {


  // TESTING: Upload a file, do nothing with it, put a test file on S3. If not uploading a file, return success message

  try {
  
    const submitData = JSON.parse(event.body)
    // if (typeof(submitData.file !== 'undefined')) {
    //   const srcData = Buffer.from(submitData.file.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    //   const params = {
    //     Bucket: 'docqet-images',
    //     Key: 'sponsors/test.jpg',
    //     Body: srcData,
    //     ContentType: 'image/jpeg'
    //   }
    //   return  {
    //     statusCode: 200,
    //     body: JSON.stringify({ params: params })
    //   }
    // } else {
    //   return  {
    //     statusCode: 200,
    //     body: JSON.stringify({ message: `success` })
    //   }
    // }

    if (typeof(submitData.file !== 'undefined')) {
      // const srcData = Buffer.from(submitData.file.replace(/^data:image\/\w+;base64,/, ""), 'base64')
      const srcData = 'test'

      const params = {
        Bucket: 'docqet-images',
        Key: 'sponsors/test',
        Body: srcData,
      }
      s3.putObject(params, function(err, data) {
        if (err) {
          return  {
            statusCode: 500,
            body: JSON.stringify({ srcData: srcData, message: `putObject Error: Could not upload image`, error: err })
          }
        } else {
          return  {
            statusCode: 200,
            body: JSON.stringify({ message: `success` })
          }
        }
      })
    } else {
      return  {
        statusCode: 200,
        body: JSON.stringify({ message: `success` })
      }
    }


    

  } catch (err) {
    return  {
      statusCode: 500,
      body: JSON.stringify({ message: `Could not upload image`, error: err })
    }
  }
}

 

