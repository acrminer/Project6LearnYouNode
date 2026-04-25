// My First I/O: Write a program that uses a single synchronous filesystem operation to
//  read a file and print the number of newlines (\n) it contains to the
//  console (stdout), similar to running cat file | wc -l.
// Source: https://nodejs.org/api/fs.html#fsreadfilesyncpath-options

// The fs module provides filesystem operations built into Node.js.
// require('fs') loads it so we can use its methods.
const fs = require('fs')

// fs.readFileSync takes a file path and returns the file contents as a Buffer.
// Calling .toString() on the Buffer converts it to a plain string.
// process.argv[2] is the first user-supplied argument: the path to the file.
const contents = fs.readFileSync(process.argv[2]).toString()

// Split the string on every newline character to get an array of lines.
// Since the file has no trailing newline, the array length is always
// one more than the actual number of newlines, so we subtract 1.
const lineCount = contents.split('\n').length - 1

console.log(lineCount)
