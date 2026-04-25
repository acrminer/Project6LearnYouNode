// Create a program that prints a list of files in a given directory,
//  filtered by the extension of the files. The first argument is the
//  directory name and the second argument is the extension filter. Print the
//  list of files (one file per line) to the console. You must use
//  asynchronous I/O.

// Source (require / local modules): https://nodejs.org/api/modules.html#moduleexports

// require('./mymodule') loads our local module file.
// The './' prefix tells Node this is a local file, not a built-in or npm package.
// mymodule is the single function that mymodule.js exports.
const mymodule = require('./mymodule')

const dir = process.argv[2] // first user argument: directory to list
const ext = process.argv[3] // second user argument: extension to filter by (no dot)

// Call our module with the directory, extension, and an error-first callback.
mymodule(dir, ext, function(err, list) {
  if (err) {
    console.error('An error occurred: ' + err.message)
    return
  }

  // Print each matching filename on its own line.
  list.forEach(function(file) {
    console.log(file)
  })
})
