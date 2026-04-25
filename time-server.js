// Time Server: Write a TCP time server!
// Your server should listen to TCP connections on the port provided by the
// first argument to your program.

// Source (net.createServer): https://nodejs.org/api/net.html#netcreateserveroptions-connectionlistener
// Source (socket.end):       https://nodejs.org/api/net.html#socketenddata-encoding-callback

const net = require('net')

// Helper to zero-pad a number to 2 digits (e.g. 7 -> "07").
function pad(n) {                  //Ternary Operator: https://www.w3schools.com/js/js_if_ternary.asp
  return n < 10 ? '0' + n : '' + n //also converts 2 digits numbers to string
}

// net.createServer() creates a TCP server. The callback is the connection
// listener — it is called once per incoming connection with a socket object.
// The socket is a duplex stream: it can be read from and written to.
const server = net.createServer(function(socket) {
  var now = new Date()  //Date exists in any JS environment https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

  // Build the required "YYYY-MM-DD hh:mm" format from individual Date methods.
  var formatted =
    now.getFullYear() + '-' +
    pad(now.getMonth() + 1) + '-' + //getMonth() is zero-indexed, hence +1
    pad(now.getDate()) + ' ' +
    pad(now.getHours()) + ':' +
    pad(now.getMinutes())

  // socket.end(data) is equivalent to socket.write(data) followed by socket.end().
  // It sends the data then sends a FIN packet to half-close the connection.
  socket.end(formatted + '\n')
})

// Start the server on the port passed as the first command-line argument.
server.listen(Number(process.argv[2]))