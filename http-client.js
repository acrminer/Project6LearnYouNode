// HTTP Client: Write a program that performs an HTTP GET request to a URL
// provided to you as the first command-line argument. Write the String
// contents of each "data" event from the response to a new line on the
// console (stdout).

// Source (http.get): https://nodejs.org/api/http.html#httpgeturl-options-callback

// http is a built-in Node.js module for making HTTP requests.
const http = require('http')

// http.get() is a convenience method for simple GET requests.
// First argument is the URL; second is a callback that receives the response.
// The response is a Node Stream: an object that emits events as data arrives.
http.get(process.argv[2], function(response) {
  // Tell the stream to emit strings instead of raw Buffer objects.
  response.setEncoding('utf8')

  // The 'data' event fires each time a chunk of the response body is ready.
  // Chunks arrive incrementally, so this may fire multiple times per request.
  response.on('data', function(data) {
    console.log(data)
  })

  // The 'error' event fires if the request fails (e.g. bad URL, network issue).
  response.on('error', function(err) {
    console.error(err)
  })
})
