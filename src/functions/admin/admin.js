
exports.handler = (event, context, callback) => {

  const body = JSON.parse(event.body)
  if (!body) {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        data: 'Missing request body'
      })
    })
  }

  if (body.adminCode && body.adminCode === process.env.ADMIN_CODE) {
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: `success` })
    })
  } else {
    return callback(null, {
      statusCode: 422,
      body: JSON.stringify({
        data: 'Invalid request'
      })
    })
  }
    
}