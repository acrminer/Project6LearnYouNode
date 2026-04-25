// HTTP JSON API Server: Write an HTTP server that serves JSON data when it
// receives a GET request to the path '/api/parsetime'. Expect the request to
// contain a query string with a key 'iso' and an ISO-format time as the value.

// Source (http.createServer): https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// Source (response.writeHead): https://nodejs.org/api/http.html#responsewriteheadstatuscode-statusmessage-headers
// Source (URL constructor):   https://nodejs.org/api/url.html#new-urlinput-base

const http = require('http')

const server = http.createServer(function(req, res) {
  // new URL() parses the request URL into structured parts.
  // A base is required when the input is a relative path (no host), which is
  // always the case for req.url. The base host value doesn't matter here.
  const parsedUrl = new URL(req.url, 'http://example.com')

  // searchParams.get() retrieves the value of the 'iso' query parameter.
  const iso = parsedUrl.searchParams.get('iso')

  // Pass the ISO string to the Date constructor to get a Date object we can extract individual time components from.
  const date = new Date(iso)

  var result

  if (parsedUrl.pathname === '/api/parsetime') {
    // Return hour, minute, and second as separate numeric properties.
    result = {
      hour:   date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds()
    }
  } else if (parsedUrl.pathname === '/api/unixtime') {
    // Date.getTime() returns milliseconds elapsed since 1 Jan 1970 00:00:00 UTC.
    result = {
      unixtime: date.getTime()
    }
  }

  if (result) {
    // res.writeHead() sends the HTTP status code and response headers.
    // It must be called exactly once per response, and before res.end().
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } else {
    res.writeHead(404)
    res.end()
  }
})

server.listen(Number(process.argv[2]))
