// Filtered LS: Create a program that prints a list of files in a given directory,
// filtered by the extension of the files. You will be provided a directory name
// as the first argument to your program (e.g. '/path/to/dir/') and a file
// extension to filter by as the second argument.

// Source (fs.readdir):  https://nodejs.org/api/fs.html#fsreaddirpath-options-callback
// Source (path.extname): https://nodejs.org/api/path.html#pathextnamepath

// fs provides filesystem operations; path provides utilities for file path strings.
const fs = require('fs')
const path = require('path')

const dir = process.argv[2]       // first user argument: directory to list
const ext = '.' + process.argv[3] // second user argument: extension to filter by (e.g. 'txt' -> '.txt')

// fs.readdir() asynchronously reads a directory and calls the callback with an array of filename strings (excluding '.' and '..').
// Callback signature: function(err, list)
fs.readdir(dir, function(err, list) {
  if (err) throw err

  list.forEach(function(file) {
    // path.extname() returns the extension of a filename including the leading dot,
    // e.g. path.extname('hello.txt') returns '.txt'.
    // We only print the file if its extension matches the one requested.
    if (path.extname(file) === ext) {
      console.log(file)
    }
  })
})
