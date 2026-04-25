// My First Async I/O:  Write a program that uses a single asynchronous filesystem operation to
//  read a file and print the number of newlines it contains to the console
//  (stdout), similar to running cat file | wc -l.
// Source: https://nodejs.org/api/fs.html#fsreadfilepath-options-callback

// Load the built-in filesystem module.
const fs = require('fs')

// fs.readFile() is the asynchronous version of readFileSync.
// Unlike readFileSync, it does not block. it registers a callback and
// returns immediately, letting Node.js continue while the OS reads the file.
//
// Arguments:
//   1. path      // the file to read (supplied by the user via command-line)
//   2. 'utf8'    // encoding; tells Node to give us a string instead of a Buffer
//   3. callback  // called by Node when the read is complete (or fails)
//
// The callback follows the Node.js error-first convention:
//   err  // an Error object if something went wrong, otherwise null
//   data // the file contents as a string (because we passed 'utf8')
fs.readFile(process.argv[2], 'utf8', function callback(err, data) {
  if (err) throw err

  // Split on newline characters to count them.
  // The file has no trailing newline, so the array is always one element
  // longer than the number of newlines. subtract 1 to correct for that.
  const lineCount = data.split('\n').length - 1

  console.log(lineCount)
})
