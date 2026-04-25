// HTTP Uppercaserer: Write an HTTP server that receives only POST requests
// and converts incoming POST body characters to upper-case and returns it
// to the client.

// Source (http.createServer): https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// Source (stream .pipe()):    https://nodejs.org/api/stream.html#streampipelinestreams-callback
// Source (through2-map):      https://github.com/workshopper/learnyounode (bundled package)

const http = require('http')
const map = require('through2-map')

// http.createServer() fires the callback once per incoming request.
// req is a readable stream of the request body.
// res is a writable stream we send the response into.
const server = http.createServer(function(req, res) {
  // through2-map creates a transform stream, that is, a pass-through that modifies each chunk as it travels from source to destination.
  // each chunk is converted to a string and uppercased.
  //
  // The pipeline: req (readable) -> map transform -> res (writable)
  // .pipe() forwards data chunk-by-chunk without buffering the whole body,
  // and automatically ends res when req finishes.
  req.pipe(map(function(chunk) {
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

server.listen(Number(process.argv[2]))
