// This problem is the same as the previous but introduces the concept of
// modules. You will need to create two files to solve this.

// Source (fs.readdir):   https://nodejs.org/api/fs.html#fsreaddirpath-options-callback
// Source (path.extname): https://nodejs.org/api/path.html#pathextnamepath
// Source (module.exports): https://nodejs.org/api/modules.html#moduleexports

const fs = require('fs')
const path = require('path')

// module.exports assigns the function this file exposes to anyone who require()s it.
// The caller passes: the directory path, the extension string, and a callback.
// The callback follows the error-first convention: callback(err, data).
module.exports = function(dir, ext, callback) {
  // fs.readdir() asynchronously lists all files in a directory.
  // On success, list is an array of filename strings, excluding '.' and '..'.
  fs.readdir(dir, function(err, list) {
    // If an error occurred, pass it to the caller via the callback and return
    // early so no further code runs.
    if (err) { return callback(err) }

    // Filter the list to only files whose extension matches the requested one.
    // path.extname() returns the extension with a leading dot (e.g. '.txt'),
    // so we prefix the caller's ext string with '.' before comparing.
    const filtered = list.filter(function(file) {
      return path.extname(file) === '.' + ext
    })

    // No error: call the callback with null as the first argument (no error) and the filtered array as the data.
    callback(null, filtered)
  })
}
