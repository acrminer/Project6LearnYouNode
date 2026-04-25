// HTTP Collect: Write a program that performs an HTTP GET request to a URL
// provided to you as the first command-line argument. Collect all data from
// the server (not just the first "data" event) and then write two lines to
// the console (stdout).

// Source (http.get):      https://nodejs.org/api/http.html#httpgeturl-options-callback
// Source (stream events): https://nodejs.org/api/stream.html#event-end

const http = require('http')

http.get(process.argv[2], function(response) {
  response.setEncoding('utf8')

  // Accumulate chunks here; each 'data' event may only deliver part of the
  // full response body, so we build the complete string across all events.
  var body = ''

  // Append each incoming chunk to our accumulator string.
  response.on('data', function(data) {
    body += data
  })

  // The 'end' event fires once when the stream has no more data to deliver.
  // At this point body holds the complete response, so we can print results.
  response.on('end', function() {
    console.log(body.length) // total character count
    console.log(body)        // full response string
  })

  response.on('error', function(err) {
    console.error(err)
  })
})
