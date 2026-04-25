// HTTP File Server: Write an HTTP server that serves the same text file for
// each request it receives.

// Source (http.createServer):    https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// Source (fs.createReadStream):  https://nodejs.org/api/fs.html#fscreatereadstreampath-options

const http = require('http')
const fs = require('fs')

const filePath = process.argv[3] // second user argument: path to the file to serve

// http.createServer() creates an HTTP server. The callback fires once per request with two arguments:
//   req: the incoming request (headers, URL, method, etc.)
//   res: the outgoing response (a writable stream we send data into)
const server = http.createServer(function(req, res) {
  // fs.createReadStream() opens the file and returns a readable stream.
  // Rather than reading the whole file into memory, it reads in chunks which is efficient for large files.

  // .pipe(res) connects the readable file stream to the writable response
  // stream, forwarding each chunk as it arrives and closing the response
  // when the file stream ends.
  fs.createReadStream(filePath).pipe(res)
})

// Start listening on the port passed as the first command-line argument.
server.listen(Number(process.argv[2]))
