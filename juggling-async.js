// Juggling Async: You must collect the complete content provided to you by each of the URLs
//  and print it to the console (stdout). You don't need to print out the
//  length, just the data as a String; one line per URL. The catch is that you
//  must print them out in the same order as the URLs are provided to you as
//  command-line arguments.

// Source (http.get):      https://nodejs.org/api/http.html#httpgeturl-options-callback
// Source (stream events): https://nodejs.org/api/stream.html#event-end

const http = require('http')

const urls = [process.argv[2], process.argv[3], process.argv[4]]

// Pre-fill a results array with one empty slot per URL.
// Using an indexed array lets each request store its response in the correct position regardless of which request finishes first.
var results = ['', '', '']
var completed = 0 // tracks how many requests have fully finished

urls.forEach(function(url, index) {
  http.get(url, function(response) {
    response.setEncoding('utf8')

    // Accumulate chunks for this specific request into its indexed slot.
    response.on('data', function(data) {
      results[index] += data
    })

    // When this request ends, increment the counter.
    // Only print all results once every request has completed.
    // This preserves the original URL order even if responses arrive out of order.
    response.on('end', function() {
      completed++
      if (completed === urls.length) {
        results.forEach(function(body) {
          console.log(body)
        })
      }
    })

    response.on('error', function(err) {
      console.error(err)
    })
  })
})
